"use client";

import { createContext, useContext, useState, useCallback } from "react";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPath, setTransitionPath] = useState(null);

  const navigate = useCallback((href) => {
    setIsTransitioning(true);
    setTransitionPath(href);
    window.location.href = href;
  }, []);

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}