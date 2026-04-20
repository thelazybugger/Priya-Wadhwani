import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <header
      className="nav-glass sticky top-0 z-50"
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          data-testid="navbar-logo-link"
          onClick={() => setOpen(false)}
        >
          <span
            className="inline-block w-8 h-8 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #9480d6, #7c68bf 70%)",
            }}
          />
          <span className="font-serif-display text-2xl tracking-tight">
            Mindful
            <span style={{ color: "#9480d6" }}>.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-testid={`nav-${item.label.toLowerCase()}-link`}
              className="text-sm font-medium tracking-wide transition-colors"
              style={{
                color: pathname === item.to ? "#9480d6" : "#0a0a0a",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/classes"
            className="btn-primary text-sm"
            data-testid="navbar-book-now-button"
          >
            Book a Class
          </Link>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="toggle menu"
          data-testid="navbar-mobile-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t border-[rgba(148,128,214,0.15)] bg-white"
          data-testid="navbar-mobile-menu"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                data-testid={`nav-mobile-${item.label.toLowerCase()}-link`}
                onClick={() => setOpen(false)}
                className="text-base font-medium"
                style={{
                  color: pathname === item.to ? "#9480d6" : "#0a0a0a",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/classes"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center"
              data-testid="navbar-mobile-book-button"
            >
              Book a Class
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
