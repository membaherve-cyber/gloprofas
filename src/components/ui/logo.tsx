import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Official GLOPROFAS logo asset component.
 * Directly references `/images/gloprofas-logo.png` using Next.js `<Image>` with
 * `priority`, `h-10 w-auto object-contain`, and explicit alt text
 * `"GLOPROFAS - Global Programme for the Fight Against Scams"`.
 */
export function Logo({
  size = "md",
  className = "",
}: LogoProps) {
  const heightClass =
    size === "sm"
      ? "h-8 w-auto object-contain"
      : size === "lg"
        ? "h-14 w-auto object-contain"
        : "h-10 w-auto object-contain";

  return (
    <span
      className={`inline-flex items-center rounded-lg bg-white px-2 py-1 shadow-none ${className}`}
    >
      <Image
        src="/images/gloprofas-logo.png"
        alt="GLOPROFAS - Global Programme for the Fight Against Scams"
        width={1132}
        height={350}
        priority
        className={heightClass}
      />
    </span>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <path
        d="M20 3 34 8v11c0 9-6 15-14 18C12 34 6 28 6 19V8z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M26 14a8 8 0 1 0 1 8h-7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWatermark({ className }: { className?: string }) {
  return <Monogram className={className} />;
}
