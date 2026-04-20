import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative mt-24 border-t border-[rgba(148,128,214,0.15)]"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block w-8 h-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #9480d6, #7c68bf 70%)",
              }}
            />
            <span className="font-serif-display text-2xl">
              Mindful<span style={{ color: "#9480d6" }}>.</span>
            </span>
          </div>
          <p className="text-[15px] text-[#4b4b4b] max-w-md leading-relaxed">
            A small, deliberate studio in the heart of the city. We teach slow,
            breath-led yoga — honest, humble, and rooted in practice.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Visit</p>
          <p className="text-sm text-[#0a0a0a] flex items-start gap-2 leading-relaxed">
            <MapPin size={16} className="mt-1 flex-shrink-0" />
            14 Lotus Lane, <br /> Indiranagar, Bengaluru 560038
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Stay Close</p>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="mailto:hello@mindful-yoga.com"
              className="flex items-center gap-2 hover:text-[#9480d6] transition-colors"
              data-testid="footer-email-link"
            >
              <Mail size={16} /> hello@mindful-yoga.com
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#9480d6] transition-colors"
              data-testid="footer-instagram-link"
            >
              <Instagram size={16} /> @mindful.yoga
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(148,128,214,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#737373]">
          <p>© {new Date().getFullYear()} Mindful Yoga Studio. Made slowly.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-[#9480d6]">
              About
            </Link>
            <Link to="/contact" className="hover:text-[#9480d6]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
