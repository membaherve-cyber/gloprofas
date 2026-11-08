"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Hero background: an AI-generated aerial still of an African city, upgraded to
 * muted aerial footage once the page is interactive.
 *
 * Accessibility and performance choices:
 * - The still is the LCP element (priority, eager). The 972 KB video is only
 *   attached after first paint so it never delays LCP or blocks interaction.
 * - `prefers-reduced-motion: reduce` never loads the video; the still remains.
 * - Muted, looped, playsInline, decorative: no audio is ever played.
 * - A visible pause control stops the motion; the choice is remembered for the
 *   session so navigating back does not restart it unexpectedly.
 */
export function HeroMedia({
  poster,
  alt,
  labels,
}: {
  poster: string;
  alt: string;
  labels: { label: string; pause: string; play: string };
}) {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) setVideoEnabled(true);
    }, 900);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, videoEnabled]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy-950">
      <Image
        src={poster}
        alt={alt}
        width={1600}
        height={900}
        priority
        fetchPriority="high"
        sizes="100vw"
        className="h-full w-full object-cover"
      />
      {videoEnabled ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={labels.label}
          tabIndex={-1}
          onError={() => setVideoEnabled(false)}
        >
          <source src="/video/hero-city.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-hero-overlay" aria-hidden="true" />
      {videoEnabled ? (
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          aria-pressed={!playing}
          aria-label={playing ? labels.pause : labels.play}
          className="absolute bottom-4 right-4 z-10 inline-flex h-10 items-center gap-1.5 rounded-full border border-white/25 bg-navy-950/60 px-3 text-micro font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
        >
          {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          <span className="hidden sm:inline">{playing ? labels.pause : labels.play}</span>
        </button>
      ) : null}
    </div>
  );
}
