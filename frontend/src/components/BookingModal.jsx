import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X, Loader2, ShieldCheck } from "lucide-react";
import useRazorpay from "../hooks/useRazorpay";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BookingModal({ open, cls, onClose }) {
  const loadRazorpay = useRazorpay();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  if (!open || !cls) return null;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/payment/create-order`, {
        class_id: cls.id,
        class_name: cls.name,
        amount: cls.price,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
      });

      const ok = await loadRazorpay();
      const isPlaceholder =
        !data.razorpay_key_id ||
        data.razorpay_key_id.includes("placeholder") ||
        !ok;

      if (isPlaceholder) {
        toast.success(
          `Booking reserved for ${cls.name}. Payment is in demo mode — add real Razorpay keys to enable live checkout.`,
          { duration: 6000 }
        );
        setLoading(false);
        onClose();
        return;
      }

      const options = {
        key: data.razorpay_key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Mindful Yoga Studio",
        description: cls.name,
        order_id: data.order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#9480d6" },
        handler: async (res) => {
          try {
            await axios.post(`${API}/payment/verify`, {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
              booking_id: data.booking_id,
            });
            toast.success(`You're in. See you at ${cls.name}.`);
            onClose();
          } catch (_err) {
            toast.error("Payment verification failed. Please contact us.");
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      toast.error("Could not start payment. Try again in a moment.");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      data-testid="booking-modal"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg card-surface p-8 md:p-10 animate-[fadeUp_0.4s_ease-out]">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f2ecfa]"
          onClick={onClose}
          aria-label="close"
          data-testid="booking-modal-close"
        >
          <X size={18} />
        </button>

        <p className="eyebrow">Reserve a Mat</p>
        <h3 className="font-serif-display text-3xl md:text-4xl leading-tight mt-2">
          {cls.name}
        </h3>
        <p className="text-sm text-[#4b4b4b] mt-1">
          {cls.schedule} · {cls.duration}
        </p>

        <div className="flex items-baseline justify-between mt-6 pb-6 border-b border-[rgba(148,128,214,0.15)]">
          <span className="text-sm uppercase tracking-wider text-[#737373]">
            Single Session
          </span>
          <span className="font-serif-display text-3xl">₹{cls.price}</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            className="input-line"
            placeholder="Your name"
            name="name"
            value={form.name}
            onChange={handleChange}
            data-testid="booking-input-name"
            required
          />
          <input
            className="input-line"
            placeholder="Email address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            data-testid="booking-input-email"
            required
          />
          <input
            className="input-line"
            placeholder="Phone (optional)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            data-testid="booking-input-phone"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-4"
            data-testid="booking-submit-button"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Processing…
              </>
            ) : (
              <>Continue to Payment · ₹{cls.price}</>
            )}
          </button>

          <p className="text-xs text-[#737373] flex items-center gap-2 justify-center">
            <ShieldCheck size={14} /> Secured by Razorpay · Cards, UPI, Netbanking
          </p>
        </form>
      </div>
    </div>
  );
}
