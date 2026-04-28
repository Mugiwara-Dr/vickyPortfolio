"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Brand Identity Genesis",
    category: "Graphic Design",
    gradient: "from-white/10 via-transparent to-transparent",
    accent: "#8B5CF6",
    tags: ["Logo Design", "Branding", "Print"],
    type: "image" as const,
  },
  {
    id: 2,
    title: "Cinematic Showreel",
    category: "Video Editing",
    gradient: "from-white/10 via-transparent to-transparent",
    accent: "#8B5CF6",
    tags: ["Premiere Pro", "After Effects", "Color Grade"],
    type: "video" as const,
  },
  {
    id: 3,
    title: "E-Learning Platform UI",
    category: "Web & UX Design",
    gradient: "from-white/10 via-transparent to-transparent",
    accent: "#8B5CF6",
    tags: ["Figma", "Wireframes", "Prototyping"],
    type: "image" as const,
  },
  {
    id: 4,
    title: "Product Motion Graphics",
    category: "Motion Design",
    gradient: "from-white/10 via-transparent to-transparent",
    accent: "#8B5CF6",
    tags: ["After Effects", "Motion", "Social Media"],
    type: "video" as const,
  },
  {
    id: 5,
    title: "Magazine & Editorial",
    category: "Print Design",
    gradient: "from-white/10 via-transparent to-transparent",
    accent: "#8B5CF6",
    tags: ["InDesign", "Layout", "Typography"],
    type: "image" as const,
  },
];

// CLEAN SLIDE — No more bounce
const cardVariants: any = {
  enter: (dir: number) => ({
    y: dir > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      y: { type: "tween", duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Clean ease-out
      opacity: { duration: 0.4 },
      scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.98,
    transition: {
      y: { type: "tween", duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3 },
    },
  }),
};

const labelVariants: any = {
  enter: (dir: number) => ({ y: 10, opacity: 0 }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const wrapperRef   = useRef<HTMLDivElement>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const isInside     = useRef(false);
  const isMoving     = useRef(false);
  const indexRef     = useRef(0);
  const lastWheel    = useRef(0);

  useEffect(() => { indexRef.current = activeIndex; }, [activeIndex]);

  const scrollToSlot = useCallback((i: number) => {
    if (!wrapperRef.current) return;
    window.scrollTo({ top: wrapperRef.current.offsetTop + i * window.innerHeight, behavior: "smooth" });
  }, []);

  const navigate = useCallback((next: number) => {
    if (isMoving.current || next < 0 || next >= projects.length) return;
    isMoving.current = true;
    setDirection(next > indexRef.current ? 1 : -1);
    setActiveIndex(next);
    scrollToSlot(next);
    setTimeout(() => { isMoving.current = false; }, 800);
  }, [scrollToSlot]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!isInside.current) return;
      const now = Date.now();
      if (now - lastWheel.current < 200) return;
      lastWheel.current = now;
      if (e.deltaY > 0 && indexRef.current < projects.length - 1) { e.preventDefault(); navigate(indexRef.current + 1); }
      else if (e.deltaY < 0 && indexRef.current > 0)               { e.preventDefault(); navigate(indexRef.current - 1); }
    };
    const onIn  = () => { isInside.current = true;  };
    const onOut = () => { isInside.current = false; };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("mouseenter", onIn);
    el.addEventListener("mouseleave", onOut);
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("mouseenter", onIn); el.removeEventListener("mouseleave", onOut); };
  }, [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isInside.current) return;
      if (e.key === "ArrowDown") { e.preventDefault(); navigate(indexRef.current + 1); }
      if (e.key === "ArrowUp")   { e.preventDefault(); navigate(indexRef.current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  useEffect(() => {
    const onScroll = () => {
      if (isInside.current || isMoving.current || !wrapperRef.current) return;
      const scrolled = window.scrollY - wrapperRef.current.offsetTop;
      if (scrolled < 0) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, Math.round(scrolled / window.innerHeight)));
      if (clamped !== indexRef.current) { setDirection(clamped > indexRef.current ? 1 : -1); setActiveIndex(clamped); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = projects[activeIndex];

  return (
    <div ref={wrapperRef} id="work" style={{ height: `${projects.length * 100}vh` }} className="relative bg-black">
      <section
        ref={sectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex"
      >
        {/* ── LEFT — Cinematic Stage ── */}
        <div className="flex-1 flex flex-col px-20 pt-[100px] pb-20 relative">
          <div className="absolute inset-0 bg-black" />
          
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={p.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full aspect-[16/10] max-w-4xl rounded-[40px] overflow-hidden bg-[#0D0D0D] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                
                {p.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-10 left-12 font-serif font-black text-[160px] text-white/[0.02] leading-none">
                  {activeIndex + 1}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={p.id + "-label"}
              custom={direction}
              variants={labelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mt-12 flex flex-col items-center gap-4"
            >
              <h3 className="text-3xl font-serif font-black text-white tracking-tight uppercase">
                {p.title}
              </h3>
              <p className="text-xs font-mono tracking-[0.6em] text-[var(--color-accent)] font-bold uppercase opacity-60">
                {p.category}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── RIGHT — Technical Navigation ── */}
        <div className="w-[360px] flex-shrink-0 flex flex-col justify-between px-12 py-32 border-l border-white/5 bg-[#050505]">
          <div className="space-y-16">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.6em] mb-6 text-white/20 font-bold">Project Directory</p>
              <div className="space-y-4">
                {projects.map((proj, i) => {
                  const active = i === activeIndex;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => navigate(i)}
                      className={`group w-full text-left flex items-center gap-6 py-2 transition-all ${active ? "opacity-100" : "opacity-20 hover:opacity-50"}`}
                    >
                      <span className="text-[10px] font-mono font-bold text-[var(--color-accent)] tracking-widest">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-sm font-sans uppercase tracking-widest ${active ? "font-black" : "font-medium"}`}>{proj.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4">
               {projects.map((_, i) => (
                 <div key={i} className={`h-[2px] flex-1 transition-all duration-700 ${i === activeIndex ? "bg-[var(--color-accent)]" : "bg-white/5"}`} />
               ))}
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.4em] text-white/10 font-black">
               <span>Next.js 14</span>
               <span>v4.2.0</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
