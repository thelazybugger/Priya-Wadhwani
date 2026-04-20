import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Moon, Sunrise, Heart } from "lucide-react";

const pillars = [
  { icon: Sunrise, label: "Breath First", copy: "Pranayama before posture. Always." },
  { icon: Leaf, label: "Slow Practice", copy: "Deliberate, honest, un-hurried." },
  { icon: Moon, label: "Yin Balance", copy: "Rest as seriously as you move." },
  { icon: Heart, label: "Small Class Sizes", copy: "Ten mats per class. No more." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden grain"
        data-testid="home-hero-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-28 md:pt-28 md:pb-40 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 fade-up">
            <p className="eyebrow">Mindful Yoga Studio · Est. 2019</p>
            <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] mt-5 tracking-tighter">
              A quiet practice <br />
              for a loud <em className="italic text-[#9480d6]">century.</em>
            </h1>
            <p className="mt-7 text-[17px] text-[#4b4b4b] max-w-xl leading-relaxed">
              Vinyasa, Yin, Ashtanga and Meditation — taught in small classes by
              teachers who actually know you by name. No mirrors, no music you
              didn't choose, no hurry.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/classes"
                className="btn-primary"
                data-testid="hero-book-class-button"
              >
                Book a Class <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn-outline"
                data-testid="hero-about-button"
              >
                Our Philosophy
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 relative">
            <div className="img-wrap aspect-[4/5] fade-up">
              <img
                src="https://images.unsplash.com/photo-1761971975973-cbb3e59263de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwzfHx5b2dhJTIwc3R1ZGlvJTIwaW50ZXJpb3IlMjBtb3JuaW5nJTIwbGlnaHR8ZW58MHx8fHwxNzc2NjY2Njg2fDA&ixlib=rb-4.1.0&q=85"
                alt="Studio interior"
              />
            </div>
            <div className="hidden md:block absolute -left-10 bottom-8 w-60 card-surface p-5 fade-up">
              <p className="eyebrow">Morning Class</p>
              <p className="font-serif-display text-2xl mt-1">Vinyasa Flow</p>
              <p className="text-sm text-[#4b4b4b]">Tomorrow · 7:00 AM</p>
              <Link
                to="/classes"
                className="mt-4 inline-flex text-sm text-[#9480d6] font-medium items-center gap-1"
                data-testid="hero-floating-card-link"
              >
                Reserve mat <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Sanskrit marquee */}
        <div className="border-y border-[rgba(148,128,214,0.15)] py-5 overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex gap-12 text-[#9480d6] font-serif-display text-2xl italic">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="inline-flex gap-12">
                <span>sthira · steady</span>
                <span>· sukha · at ease ·</span>
                <span>tapas · discipline ·</span>
                <span>svādhyāya · self-study ·</span>
                <span>ahimsa · non-harming ·</span>
                <span>ānanda · joy ·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
          <div className="md:col-span-7">
            <p className="eyebrow">How we teach</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-3 leading-tight">
              Four small commitments, <br /> made every class.
            </h2>
          </div>
          <p className="md:col-span-5 text-[#4b4b4b] leading-relaxed">
            We don't chase trends, we don't add lasers to our savasanas. We
            teach yoga the way our teachers taught us — with respect for the
            lineage and for the person on the mat.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="card-surface p-7 hover-lift"
              data-testid={`pillar-card-${p.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: "#f2ecfa", color: "#9480d6" }}
              >
                <p.icon size={20} />
              </div>
              <p className="font-serif-display text-2xl mt-5">{p.label}</p>
              <p className="text-sm text-[#4b4b4b] mt-2 leading-relaxed">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SPLIT BLOCK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 img-wrap aspect-[5/4]">
            <img
              src="https://images.pexels.com/photos/6958601/pexels-photo-6958601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Practice in progress"
            />
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow">A home for practice</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-3 leading-tight">
              Not a gym. Not a wellness brand.
            </h2>
            <p className="mt-6 text-[#4b4b4b] leading-relaxed">
              Mindful is a small room with wooden floors, large windows, a row
              of brick walls, and no attempt at ambience. We believe the
              practice doesn't need decoration — just honest teaching, room to
              breathe, and enough time.
            </p>
            <Link
              to="/about"
              className="btn-outline mt-8"
              data-testid="home-about-link"
            >
              Read our story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
