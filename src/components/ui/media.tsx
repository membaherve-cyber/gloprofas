import Image from "next/image";

/**
 * Single image component used across the site. Local assets only (no remote
 * domains on first load), explicit dimensions to avoid layout shift, a fixed
 * navy overlay treatment for dark sections and focal-point aware cropping.
 */
export function Media({
  src,
  alt,
  width,
  height,
  priority = false,
  overlay = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = "var(--radius-md)",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  overlay?: boolean;
  className?: string;
  sizes?: string;
  rounded?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: rounded }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      {overlay ? <div className="absolute inset-0 bg-navy-950/35" aria-hidden="true" /> : null}
    </div>
  );
}
