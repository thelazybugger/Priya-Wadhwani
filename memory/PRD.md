# Mindful Yoga Studio — PRD

## Original Problem Statement
"Build a yoga website with about, blog, classes, contact us with main color #9480d6 and secondary #faf6ed and text black html css and js with payment section"

## User Choices (Feb 2026)
- Stack: React + FastAPI + MongoDB
- Payment: Razorpay
- Blog: Static posts (hardcoded in `frontend/src/data/blog.js`)
- Classes: Display + "Book Now" → Razorpay payment
- Contact form: Send email via Resend

## Architecture
- Backend (FastAPI): `/api/classes`, `/api/payment/create-order`, `/api/payment/verify`, `/api/contact`, `/api/bookings`
- Frontend (React + Tailwind + Shadcn): Routes `/`, `/about`, `/classes`, `/blog`, `/contact`
- Typography: Cormorant Garamond (headings) + Manrope (body) via Google Fonts
- Colors: Primary #9480d6 · Background #faf6ed · Text #0a0a0a

## User Personas
- **Prospective student** — browses classes, reads philosophy/blog, books first session
- **Returning student** — quickly books a class by price/schedule
- **Curious visitor** — reads blog essays, learns studio story

## Implemented (Feb 2026)
- Full 5-page marketing site with sticky glassmorphism nav and editorial layouts
- Hero with asymmetric image + Sanskrit marquee
- About page: studio story, stats strip, 3 instructor cards, CTA
- Classes page: 4 classes from backend API, alternating image/text cards, Book Now modal
- Razorpay integration with graceful demo-mode fallback when placeholder keys are used
- Blog: featured post + 3 cards with full-post modal reader
- Contact form with Resend email integration (demo-mode fallback)
- Footer with studio info, Instagram, email
- Sonner toasts, lucide icons, all interactive elements have data-testid

## Status
- Backend tests: 6/6 passing
- Frontend E2E: all flows verified by testing agent
- Services: backend & frontend running under supervisor
- MOCKED: Razorpay checkout & Resend email delivery are in demo mode (placeholder keys). Real keys swap in via `/app/backend/.env`.

## Prioritized Backlog
### P1
- Replace placeholder `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RESEND_API_KEY`, `ADMIN_EMAIL` with live values
- Add webhook endpoint `/api/payment/webhook` for asynchronous payment confirmations
- Email receipt to customer after successful booking

### P2
- Admin dashboard to view bookings/contacts
- Class-pack / membership pricing bundles
- Waitlist when a class hits 10-mat cap
- Testimonials section on About page
- SEO meta per route; sitemap.xml

### P3
- Instructor bios as dedicated pages
- Blog CMS (move off static file)
- Google Calendar sync for class schedule
