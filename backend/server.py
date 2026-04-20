from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import razorpay
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay client
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', 'rzp_test_placeholder')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', 'placeholder_secret')
razor_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@mindful-yoga.com')
resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------------- Models ----------------
class CreateOrderRequest(BaseModel):
    class_id: str
    class_name: str
    amount: int  # in rupees
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = ""


class CreateOrderResponse(BaseModel):
    order_id: str
    razorpay_key_id: str
    amount: int
    currency: str
    booking_id: str


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    booking_id: str


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Contact form inquiry"
    message: str


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    class_id: str
    class_name: str
    amount: int
    customer_name: str
    customer_email: str
    customer_phone: str = ""
    order_id: Optional[str] = None
    payment_id: Optional[str] = None
    status: str = "created"  # created | paid | failed
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Mindful Yoga API"}


@api_router.get("/classes")
async def get_classes():
    # Static class catalogue (source of truth)
    return [
        {
            "id": "vinyasa-flow",
            "name": "Vinyasa Flow",
            "level": "All Levels",
            "duration": "60 min",
            "schedule": "Mon, Wed, Fri · 7:00 AM",
            "price": 899,
            "description": "A dynamic, breath-synchronized practice moving fluidly between postures to build strength, flexibility and focus.",
            "image": "https://images.pexels.com/photos/8436402/pexels-photo-8436402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
            "id": "yin-restorative",
            "name": "Yin & Restorative",
            "level": "Beginner Friendly",
            "duration": "75 min",
            "schedule": "Tue, Thu · 7:30 PM",
            "price": 799,
            "description": "Long, supported holds that invite the body to soften and the nervous system to settle. Deeply nourishing.",
            "image": "https://images.pexels.com/photos/4056406/pexels-photo-4056406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
            "id": "ashtanga",
            "name": "Ashtanga Primary",
            "level": "Intermediate",
            "duration": "90 min",
            "schedule": "Sat · 6:30 AM",
            "price": 1099,
            "description": "The traditional primary series — a disciplined, rhythmic sequence that builds heat, strength and deep presence.",
            "image": "https://images.pexels.com/photos/6958601/pexels-photo-6958601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        },
        {
            "id": "meditation-breath",
            "name": "Meditation & Breath",
            "level": "All Levels",
            "duration": "45 min",
            "schedule": "Daily · 8:30 PM",
            "price": 499,
            "description": "Guided pranayama and silent meditation to quiet the mind, regulate the breath, and end your day with clarity.",
            "image": "https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwzfHx5b2dhJTIwc3R1ZGlvJTIwaW50ZXJpb3IlMjBtb3JuaW5nJTIwbGlnaHR8ZW58MHx8fHwxNzc2NjY2Njg2fDA&ixlib=rb-4.1.0&q=85",
        },
    ]


@api_router.post("/payment/create-order", response_model=CreateOrderResponse)
async def create_order(req: CreateOrderRequest):
    amount_paise = int(req.amount) * 100
    booking = Booking(
        class_id=req.class_id,
        class_name=req.class_name,
        amount=req.amount,
        customer_name=req.customer_name,
        customer_email=req.customer_email,
        customer_phone=req.customer_phone or "",
    )
    order_id = None
    try:
        razor_order = razor_client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1,
            "receipt": booking.id[:40],
            "notes": {"class_id": req.class_id, "customer_email": req.customer_email},
        })
        order_id = razor_order["id"]
    except Exception as e:
        logger.warning(f"Razorpay order creation failed (likely placeholder keys): {e}")
        # Demo fallback so UI flow can be demonstrated without real keys
        order_id = f"order_demo_{booking.id[:12]}"

    booking.order_id = order_id
    doc = booking.model_dump()
    await db.bookings.insert_one(doc)

    return CreateOrderResponse(
        order_id=order_id,
        razorpay_key_id=RAZORPAY_KEY_ID,
        amount=amount_paise,
        currency="INR",
        booking_id=booking.id,
    )


@api_router.post("/payment/verify")
async def verify_payment(req: VerifyPaymentRequest):
    try:
        razor_client.utility.verify_payment_signature({
            "razorpay_order_id": req.razorpay_order_id,
            "razorpay_payment_id": req.razorpay_payment_id,
            "razorpay_signature": req.razorpay_signature,
        })
        verified = True
    except Exception as e:
        logger.warning(f"Signature verification failed: {e}")
        verified = False

    await db.bookings.update_one(
        {"id": req.booking_id},
        {"$set": {
            "payment_id": req.razorpay_payment_id,
            "status": "paid" if verified else "failed",
        }},
    )
    if not verified:
        raise HTTPException(status_code=400, detail="Payment verification failed")
    return {"status": "paid", "booking_id": req.booking_id}


@api_router.get("/bookings")
async def list_bookings():
    items = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return items


@api_router.post("/contact")
async def contact(req: ContactRequest):
    record = {
        "id": str(uuid.uuid4()),
        "name": req.name,
        "email": req.email,
        "subject": req.subject or "Contact form inquiry",
        "message": req.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(dict(record))
    # Strip Mongo _id if present
    record.pop("_id", None)

    html = f"""
    <div style='font-family: Manrope, Arial, sans-serif; padding: 24px; background:#faf6ed; color:#0a0a0a;'>
      <h2 style='color:#9480d6; font-family: Georgia, serif;'>New Contact Inquiry</h2>
      <p><strong>From:</strong> {req.name} &lt;{req.email}&gt;</p>
      <p><strong>Subject:</strong> {req.subject}</p>
      <p><strong>Message:</strong></p>
      <p style='background:#fff; padding:16px; border-radius:12px; border:1px solid rgba(148,128,214,0.15);'>{req.message}</p>
    </div>
    """

    email_sent = False
    email_error = None
    if RESEND_API_KEY and RESEND_API_KEY != "re_placeholder":
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [ADMIN_EMAIL],
                "subject": f"[Yoga Studio] {req.subject}",
                "html": html,
                "reply_to": req.email,
            }
            await asyncio.to_thread(resend.Emails.send, params)
            email_sent = True
        except Exception as e:
            logger.error(f"Resend send failed: {e}")
            email_error = str(e)

    return {
        "status": "received",
        "id": record["id"],
        "email_sent": email_sent,
        "email_error": email_error,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
