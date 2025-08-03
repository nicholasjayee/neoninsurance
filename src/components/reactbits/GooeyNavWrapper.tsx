"use client";

import React, {
  useRef,
  // useState,
  createContext,
  useContext,
  ReactNode,
  // useEffect,
} from "react";

// --- 1. Define and Export the Context ---
interface GooeyContextType {
  setActiveElement: (element: HTMLElement) => void;
}
const GooeyContext = createContext<GooeyContextType | null>(null);
export const useGooey = () => useContext(GooeyContext);

// --- 2. The Wrapper Component ---
export function GooeyNavWrapper({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // This logic is adapted from the original GooeyNav component
  const makeParticles = (element: HTMLElement) => {
    const particleCount = 15;
    const colors = [2, 1, 4, 2, 1, 3]; // 1:red, 2:blue, 3:yellow, 4:dark-grey

    for (let i = 0; i < particleCount; i++) {
      const noise = (n = 1) => n / 2 - Math.random() * n;
      const getXY = (d: number, i: number, t: number): [number, number] => {
        const angle = ((360 + noise(8)) / t) * i * (Math.PI / 180);
        return [d * Math.cos(angle), d * Math.sin(angle)];
      };

      const time = 600 + noise(300);
      const p = {
        start: getXY(90, i, particleCount),
        end: getXY(10 + noise(7), i, particleCount),
        time,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: noise(360),
      };

      const particle = document.createElement("span");
      particle.classList.add("particle");
      particle.style.setProperty("--start-x", `${p.start[0]}px`);
      particle.style.setProperty("--start-y", `${p.start[1]}px`);
      particle.style.setProperty("--end-x", `${p.end[0]}px`);
      particle.style.setProperty("--end-y", `${p.end[1]}px`);
      particle.style.setProperty("--time", `${p.time}ms`);
      particle.style.setProperty("--scale", `${p.scale}`);
      particle.style.setProperty("--color", `var(--color-${p.color})`);
      particle.style.setProperty("--rotate", `${p.rotate}deg`);
      element.appendChild(particle);
      setTimeout(() => {
        try {
          element.removeChild(particle);
        } catch {}
      }, time);
    }
  };

  const setActiveElement = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };

    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;

    // Clear old particles and create new ones
    const oldParticles = filterRef.current.querySelectorAll(".particle");
    oldParticles.forEach((p) => filterRef.current!.removeChild(p));
    makeParticles(filterRef.current);

    // Trigger text fade-in
    textRef.current.classList.remove("active");
    void textRef.current.offsetWidth; // Trigger reflow
    textRef.current.classList.add("active");
  };

  return (
    <GooeyContext.Provider value={{ setActiveElement }}>
      <style>{`
        :root { /* Define brand colors for particles */
          --color-1: #de350b; --color-2: #0052cc; --color-3: #ffc400; --color-4: #111827;
        }
        /* The core CSS for the effect, adapted from the original component */
        .gooey-effect-container { position: relative; }
        .effect { position: absolute; pointer-events: none; display: grid; place-items: center; z-index: 10; }
        .effect.text { color: transparent; }
        .effect.text.active { color: white; transition: color 0.01s 0.1s; } /* Delay text appearance slightly */
        .effect.filter { filter: url(#gooey-nav-filter); }
        .effect.filter::after { content: ""; position: absolute; inset: 0; background: white; transform: scale(0); opacity: 0; z-index: -1; border-radius: 9999px; }
        .effect.active::after, .effect:has(+ .text.active)::after { animation: pill 0.4s ease-out both; }
        @keyframes pill { to { transform: scale(1); opacity: 1; } }
        .particle { position: absolute; top: calc(50% - 10px); left: calc(50% - 10px); animation: particle var(--time) ease-out 1; }
        .particle::before { content: ""; display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--color); transform-origin: center; animation: point var(--time) ease-out 1; }
        @keyframes particle { 0% { transform: rotate(0deg) translate(var(--start-x), var(--start-y)); } 70%, 85% { transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y)); } 100% { transform: rotate(calc(var(--rotate) * 1.2)) translate(var(--end-x), var(--end-y)); opacity: 0; } }
        @keyframes point { 0%, 85% { transform: scale(0); opacity: 0; } 25% { transform: scale(calc(var(--scale) * 0.25)); } 38%, 65% { opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
      `}</style>

      <div className="gooey-effect-container" ref={containerRef}>
        {/* The actual Navbar links will be rendered here */}
        {children}

        {/* The layers that create the animation */}
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />

        {/* The SVG filter that creates the gooey effect */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="gooey-nav-filter">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </GooeyContext.Provider>
  );
}
