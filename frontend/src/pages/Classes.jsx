import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock, CalendarDays, Users, ArrowRight } from "lucide-react";
import BookingModal from "../components/BookingModal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/classes`)
      .then((r) => setClasses(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-10">
        <p className="eyebrow">Schedule & Booking</p>
        <h1 className="font-serif-display text-5xl md:text-7xl mt-4 leading-[1.05] tracking-tighter">
          Pick a class. <br />
          <em className="italic text-[#9480d6]">Show up.</em>
        </h1>
        <p className="text-[17px] text-[#4b4b4b] max-w-2xl mt-6 leading-relaxed">
          Small group classes, capped at ten. Pay per session — no memberships,
          no contracts. If you can't make it, let us know twelve hours ahead
          and we'll credit your next class.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        {loading ? (
          <div
            className="text-center py-20 text-[#737373]"
            data-testid="classes-loading"
          >
            Loading schedule…
          </div>
        ) : (
          <div className="space-y-8">
            {classes.map((c, i) => (
              <article
                key={c.id}
                className={`grid md:grid-cols-12 gap-6 md:gap-10 items-center card-surface overflow-hidden ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
                data-testid={`class-card-${c.id}`}
              >
                <div className="md:col-span-5 img-wrap aspect-[4/3] md:aspect-auto md:h-full rounded-none">
                  <img src={c.image} alt={c.name} />
                </div>

                <div className="md:col-span-7 p-8 md:p-10">
                  <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#9480d6]">
                    <span>{c.level}</span>
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{ background: "#9480d6" }}
                    />
                    <span>Session {i + 1}</span>
                  </div>
                  <h2 className="font-serif-display text-3xl md:text-4xl mt-3 leading-tight">
                    {c.name}
                  </h2>
                  <p className="mt-4 text-[#4b4b4b] leading-relaxed max-w-xl">
                    {c.description}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mt-7 text-sm">
                    <div className="flex items-center gap-2 text-[#0a0a0a]">
                      <CalendarDays size={16} className="text-[#9480d6]" />
                      {c.schedule}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#9480d6]" />
                      {c.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#9480d6]" />
                      10 mats max
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(148,128,214,0.15)]">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#737373]">
                        Per Session
                      </p>
                      <p className="font-serif-display text-3xl mt-1">
                        ₹{c.price}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelected(c)}
                      className="btn-primary"
                      data-testid={`book-now-${c.id}`}
                    >
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <BookingModal
        open={!!selected}
        cls={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
