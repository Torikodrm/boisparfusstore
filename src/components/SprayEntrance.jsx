"use client";

import { useState } from "react";
import { LogoAnimation } from "./LogoAnimation";

export function SprayEntrance({ children }) {
  const [done, setDone] = useState(false);

  return (
    <>
      {done ? null : <LogoAnimation onComplete={() => setDone(true)} />}
      <div
        className="min-h-screen"
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 900ms cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </>
  );
}