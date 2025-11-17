"use client";

import React, { MouseEvent, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export function RippleContainer() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function createRipple(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const size = Math.min(rect.width, rect.height) * 0.6; // SMALL ripple (60%)
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 380);
  }

  return (
    <div
      onClick={createRipple}
      className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute bg-white/40 dark:bg-white/20 rounded-full animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
    </div>
  );
}
