"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

type BeforeAfterSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "До процедуры",
  afterAlt = "После процедуры",
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const loadedRef = useRef(new Set<string>());
  const [, forceRender] = useState(0);

  // Handle image load — works for both fresh loads and cached images
  const registerImageLoad = useCallback((src: string) => {
    if (loadedRef.current.has(src)) return;
    loadedRef.current.add(src);
    forceRender((n) => n + 1);
  }, []);

  // Ref callback that checks img.complete for already-cached images
  const imgRefCallback = useCallback(
    (src: string) => (el: HTMLImageElement | null) => {
      if (!el) return;
      if (el.complete && el.naturalWidth > 0) {
        registerImageLoad(src);
      }
    },
    [registerImageLoad]
  );

  const bothLoaded = loadedRef.current.size >= 2;

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("pointercancel", handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none overflow-hidden rounded-2xl bg-slate-200 ${className}`}
      style={{ aspectRatio: "4 / 5" }}
      role="img"
      aria-label={`Сравнение: ${beforeAlt} и ${afterAlt}`}
    >
      {/* Skeleton placeholder */}
      {!bothLoaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      )}

      {/* After image (full width, bottom layer — right side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRefCallback(afterImage)}
        src={afterImage}
        alt={afterAlt}
        onLoad={() => registerImageLoad(afterImage)}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          bothLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Before image (clipped on the left side by slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRefCallback(beforeImage)}
          src={beforeImage}
          alt={beforeAlt}
          onLoad={() => registerImageLoad(beforeImage)}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            bothLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: `${100 / (sliderPosition / 100)}%`,
            maxWidth: "none",
          }}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2">
          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
            style={{ touchAction: "none" }}
            onPointerDown={handlePointerDown}
            role="slider"
            aria-label="Разделитель сравнения"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(2, p - 2));
              if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(98, p + 2));
            }}
          >
            {/* Invisible touch-target extension */}
            <div className="absolute -inset-4" />
            <div className="relative flex h-20 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-150 hover:scale-105 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-slate-700"
              >
                <path d="M8 4l-6 8 6 8" />
                <path d="M16 4l6 8-6 8" />
              </svg>
            </div>
          </div>

          {/* Vertical line */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-md" />
        </div>
      </div>

      {/* Labels */}
      {/* "До" label on the left (before image area) */}
      <span
        className="absolute left-4 top-4 z-20 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 backdrop-blur-sm shadow-sm"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        До
      </span>

      {/* "После" label on the right (after image area) */}
      <span
        className="absolute right-4 top-4 z-20 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-800 backdrop-blur-sm shadow-sm"
        style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
      >
        После
      </span>
    </div>
  );
}
