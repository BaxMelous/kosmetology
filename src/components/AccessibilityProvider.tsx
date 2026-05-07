"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AccessibilityContextType = {
  enabled: boolean;
  toggle: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType>({
  enabled: false,
  toggle: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("accessibility-mode");
    if (stored === "true") {
      setEnabled(true);
    }
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("accessibility-mode", String(next));
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("accessibility-mode", enabled);
  }, [enabled]);

  return (
    <AccessibilityContext.Provider value={{ enabled, toggle }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
