import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Mail, Phone, Clock, Loader2, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Name, email, and message are required.");
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      if (data.email_sent) {
        toast.success("Thank you — we'll be in touch shortly.");
      } else {
        toast.success(
          "Message received. (Email relay is in demo mode — add Resend API key to enable.)",
          { duration: 5000 }
        );
      }
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (_err) {
      toast.error("Couldn't send right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-10">
        <p className="eyebrow">Say hello</p>
        <h1 className="font-serif-display text-5xl md:text-7xl mt-4 leading-[1.05] tracking-tighter">
          Come <em className="italic text-[#9480d6]">in.</em> <br />
          Or write to us.
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        <div className="grid md:grid-cols-12 gap-12">
          {/* CONTACT INFO */}
          <aside className="md:col-span-5 flex flex-col gap-8">
            <div>
              <p className="eyebrow">The studio</p>
              <p className="font-serif-display text-3xl mt-3 leading-snug">
                14 Lotus Lane, Indiranagar <br />
                Bengaluru, 560038
              </p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#9480d6] mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#737373]">
                    Visit
                  </p>
                  <p>Next to the old bookshop, first floor.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#9480d6] mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#737373]">
                    Email
                  </p>
                  <a
                    href="mailto:hello@mindful-yoga.com"
                    className="hover:text-[#9480d6]"
                    data-testid="contact-email-link"
                  >
                    hello@mindful-yoga.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#9480d6] mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#737373]">
                    Call
                  </p>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[#9480d6] mt-0.5" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#737373]">
                    Hours
                  </p>
                  <p>Mon–Sat · 6:00 AM to 9:30 PM</p>
                  <p>Sun · 7:00 AM to 12:00 PM</p>
                </div>
              </div>
            </div>

            <div
              className="card-surface p-6"
              style={{ background: "#f2ecfa" }}
              data-testid="contact-first-class-card"
            >
              <p className="eyebrow">First time?</p>
              <p className="font-serif-display text-xl mt-2 leading-snug">
                Drop us a note and we'll recommend the right class for your
                body and schedule.
              </p>
            </div>
          </aside>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 card-surface p-8 md:p-10"
            data-testid="contact-form"
          >
            <p className="eyebrow">Send a message</p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3">
              We read everything.
            </h2>

            <div className="mt-8 space-y-6">
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="input-line"
                data-testid="contact-input-name"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="input-line"
                data-testid="contact-input-email"
                required
              />
              <input
                name="subject"
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={handleChange}
                className="input-line"
                data-testid="contact-input-subject"
              />
              <textarea
                name="message"
                placeholder="How can we help?"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="input-line resize-none"
                data-testid="contact-input-message"
                required
              />

              <button
                type="submit"
                disabled={sending}
                className="btn-primary mt-4"
                data-testid="contact-submit-button"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
