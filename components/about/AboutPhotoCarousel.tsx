'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';

type Slide = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

/** Real Foundation / owner-supplied photographs only — no stock or generated images. */
const SLIDES: Slide[] = [
  {
    src: '/images/foundation/foundation-certificate-ceremony-01.jpg',
    alt: 'Jeevan Chetna Foundation certificate ceremony with team and participants',
    caption: 'Certificate distribution ceremony with Foundation leadership, team members, and participants.',
    tag: 'Certificate ceremony',
  },
  {
    src: '/images/activities/plantation/plantation-group-outdoor-01.jpg',
    alt: 'Tree plantation activity with Foundation volunteers outdoors',
    caption: 'Foundation team and volunteers during an outdoor tree plantation drive.',
    tag: 'Plantation drive',
  },
  {
    src: '/images/activities/plantation/plantation-pink-building-01.jpg',
    alt: 'Community plantation activity near local building with Foundation members',
    caption: 'Plantation and greening activity with Foundation members and local participants.',
    tag: 'Community plantation',
  },
  {
    src: '/images/foundation/foundation-riverside-group-01.jpg',
    alt: 'Jeevan Chetna Foundation team group photograph by the riverside',
    caption: 'Foundation team and volunteers gathered by the riverside during field outreach.',
    tag: 'Team outing',
  },
  {
    src: '/images/foundation/foundation-group-01.jpg',
    alt: 'Jeevan Chetna Foundation team and participants group photograph',
    caption: 'Foundation team members and participants at a Jeevan Chetna Foundation gathering.',
    tag: 'Team & participants',
  },
  {
    src: '/images/activities/community/community-activity-01.jpg',
    alt: 'Community gathering with Foundation members',
    caption: 'Community activity with Foundation members and local participants.',
    tag: 'Community',
  },
  {
    src: '/images/activities/plantation/plantation-activity-01.jpg',
    alt: 'Tree plantation activity with Foundation participants',
    caption: 'Team members and volunteers during a Green Haldwani plantation activity.',
    tag: 'Plantation team',
  },
  {
    src: '/images/foundation/green-haldwani-01.jpg',
    alt: 'Green Haldwani program photograph',
    caption: 'Green Haldwani environmental work with Foundation participants.',
    tag: 'Green Haldwani',
  },
  {
    src: '/images/activities/education/education-foundation-01.jpg',
    alt: 'Education sector support activity',
    caption: 'Education sector work under Jeevan Chetna Foundation programs.',
    tag: 'Education',
  },
  {
    src: '/images/activities/computer-education/computer-education-foundation-01.jpg',
    alt: 'Computer education / digital confidence session',
    caption: 'Computer education and digital confidence session with participants.',
    tag: 'Digital education',
  },
  {
    src: '/images/activities/hunger-relief/hunger-relief-foundation-01.jpg',
    alt: 'Hunger relief and community welfare activity',
    caption: 'Community welfare and hunger relief outreach with the Foundation team.',
    tag: 'Hunger relief',
  },
  {
    src: '/images/activities/plantation/plantation-foundation-01.jpg',
    alt: 'Plantation drive with Foundation members',
    caption: 'Plantation drive documenting Foundation field work in Haldwani.',
    tag: 'Plantation',
  },
];

const INTERVAL_MS = 4500;

export function AboutPhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(index + 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const slide = SLIDES[index];

  return (
    <div
      className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="px-4 sm:px-5 pt-4 pb-2 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800">
          <Users className="w-3.5 h-3.5 text-forest-700" />
          <span>Team, community & program moments</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium tabular-nums">
          {index + 1} / {SLIDES.length}
        </span>
      </div>

      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-100">
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-forest-800 border border-white/80 shadow-xs">
            {slide.tag}
          </span>
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-sm text-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200 shadow-sm text-slate-700 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-forest-700' : 'w-1.5 bg-white/80 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="px-4 py-2.5 text-[11px] text-slate-500 border-t border-slate-100">
        {slide.caption}
      </p>
    </div>
  );
}
