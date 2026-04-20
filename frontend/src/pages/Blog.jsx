import React, { useState } from "react";
import { blogPosts } from "../data/blog";
import { ArrowRight, X, Clock } from "lucide-react";

export default function Blog() {
  const [open, setOpen] = useState(null);
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-10">
        <p className="eyebrow">The Journal</p>
        <h1 className="font-serif-display text-5xl md:text-7xl mt-4 leading-[1.05] tracking-tighter">
          Notes from <br />
          the <em className="italic text-[#9480d6]">mat.</em>
        </h1>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <button
          onClick={() => setOpen(featured)}
          className="group grid md:grid-cols-12 gap-10 items-center text-left w-full"
          data-testid={`blog-featured-${featured.id}`}
        >
          <div className="md:col-span-7 img-wrap aspect-[5/3]">
            <img src={featured.cover} alt={featured.title} />
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow">Featured · {featured.category}</p>
            <h2 className="font-serif-display text-4xl md:text-5xl mt-3 leading-[1.1] group-hover:text-[#9480d6] transition-colors">
              {featured.title}
            </h2>
            <p className="mt-5 text-[#4b4b4b] leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-5 text-sm text-[#737373]">
              <span>{featured.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {featured.readTime}
              </span>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-[#9480d6] font-medium">
              Read essay <ArrowRight size={16} />
            </span>
          </div>
        </button>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-[rgba(148,128,214,0.15)]">
        <div className="grid md:grid-cols-3 gap-8">
          {rest.map((p) => (
            <button
              key={p.id}
              onClick={() => setOpen(p)}
              className="group text-left hover-lift"
              data-testid={`blog-card-${p.id}`}
            >
              <div className="img-wrap aspect-[4/3]">
                <img src={p.cover} alt={p.title} />
              </div>
              <p className="eyebrow mt-5">{p.category}</p>
              <h3 className="font-serif-display text-2xl md:text-3xl mt-2 leading-tight group-hover:text-[#9480d6] transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-[#4b4b4b] leading-relaxed">
                {p.excerpt}
              </p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#737373]">
                <span>{p.date}</span>
                <span>·</span>
                <span>{p.readTime}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DETAIL MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto"
          data-testid="blog-detail-modal"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          />
          <div className="relative min-h-full flex items-start md:items-center justify-center py-10 px-4">
            <div className="relative w-full max-w-2xl card-surface p-8 md:p-12 animate-[fadeUp_0.4s_ease-out]">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f2ecfa]"
                onClick={() => setOpen(null)}
                aria-label="close"
                data-testid="blog-modal-close"
              >
                <X size={18} />
              </button>
              <p className="eyebrow">{open.category}</p>
              <h2 className="font-serif-display text-4xl md:text-5xl mt-3 leading-tight">
                {open.title}
              </h2>
              <div className="flex items-center gap-4 mt-4 text-xs text-[#737373]">
                <span>{open.date}</span>
                <span>·</span>
                <span>{open.readTime}</span>
              </div>
              <div className="img-wrap aspect-[16/9] mt-8">
                <img src={open.cover} alt={open.title} />
              </div>
              <div className="mt-8 text-[#0a0a0a] text-[17px] leading-[1.8] whitespace-pre-line font-sans-body">
                {open.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
