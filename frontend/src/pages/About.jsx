import React from "react";
import { Link } from "react-router-dom";

const instructors = [
  {
    name: "Ananya Rao",
    role: "Founder · Ashtanga Lead",
    bio: "Trained at KPJAYI, Mysore. Teaches with patience and quiet precision.",
    image:
      "https://images.pexels.com/photos/4056406/pexels-photo-4056406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Kabir Mehta",
    role: "Vinyasa · Breathwork",
    bio: "Former engineer, now a full-time teacher. Obsessed with the breath.",
    image:
      "https://images.pexels.com/photos/8436402/pexels-photo-8436402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Leela Iyer",
    role: "Yin · Restorative",
    bio: "Yoga therapist. Works with students navigating stress, anxiety, sleep.",
    image:
      "https://images.pexels.com/photos/6958601/pexels-photo-6958601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function About() {
  return (
    <>
      {/* HEADER */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16">
        <p className="eyebrow">About the studio</p>
        <h1 className="font-serif-display text-5xl md:text-7xl mt-4 leading-[1.05] tracking-tighter">
          We teach yoga. <br />
          <em className="italic text-[#9480d6]">Only</em> yoga.
        </h1>
        <p className="text-[17px] text-[#4b4b4b] max-w-2xl mt-8 leading-relaxed">
          Mindful was started in 2019 above a small bookshop in Indiranagar. We
          had one mat, two students, and a stubborn belief that the practice
          didn't need to be sold — it just needed to be offered, consistently,
          by people who practise themselves.
        </p>
      </section>

      {/* ASYMMETRIC IMAGE + STORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 img-wrap aspect-[5/4]">
            <img
              src="https://images.pexels.com/photos/6958601/pexels-photo-6958601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Studio moment"
            />
          </div>
          <div className="md:col-span-5 flex flex-col justify-center">
            <p className="eyebrow">What we believe</p>
            <h2 className="font-serif-display text-3xl md:text-4xl mt-3 leading-tight">
              The practice is the point.
            </h2>
            <p className="mt-5 text-[#4b4b4b] leading-relaxed">
              You won't find branded merch, a juice bar, or a wall of
              certifications at Mindful. What you will find is a small teaching
              team that shows up every day, a community of regulars who know
              each other's names, and an unwavering respect for the lineage
              we've inherited.
            </p>
            <p className="mt-4 text-[#4b4b4b] leading-relaxed">
              We believe a good class leaves you feeling clearer, not drained;
              taller, not thinner; kinder, not harder.
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid sm:grid-cols-3 gap-10 border-y border-[rgba(148,128,214,0.15)] py-12">
          {[
            { k: "2019", v: "Studio opened" },
            { k: "10", v: "Mats per class — always" },
            { k: "4", v: "Teachers, full-time" },
          ].map((s) => (
            <div key={s.k}>
              <p className="font-serif-display text-5xl md:text-6xl text-[#9480d6]">
                {s.k}
              </p>
              <p className="text-sm text-[#4b4b4b] mt-1 tracking-wide">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INSTRUCTORS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="mb-10">
          <p className="eyebrow">The teachers</p>
          <h2 className="font-serif-display text-4xl md:text-5xl mt-3 leading-tight">
            Four people. Every class.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((t) => (
            <article
              key={t.name}
              className="card-surface p-6 hover-lift"
              data-testid={`instructor-card-${t.name.split(" ")[0].toLowerCase()}`}
            >
              <div className="img-wrap aspect-[4/5]">
                <img src={t.image} alt={t.name} />
              </div>
              <h3 className="font-serif-display text-2xl mt-5">{t.name}</h3>
              <p className="text-xs tracking-[0.18em] uppercase text-[#9480d6] font-semibold mt-1">
                {t.role}
              </p>
              <p className="text-sm text-[#4b4b4b] mt-3 leading-relaxed">
                {t.bio}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div
          className="card-surface p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{ background: "#f2ecfa" }}
        >
          <div>
            <p className="eyebrow">Come visit</p>
            <h3 className="font-serif-display text-3xl md:text-4xl mt-3">
              Your first class is the hardest. <br />
              We'll make it easy.
            </h3>
          </div>
          <Link
            to="/classes"
            className="btn-primary"
            data-testid="about-cta-button"
          >
            See Class Schedule
          </Link>
        </div>
      </section>
    </>
  );
}
