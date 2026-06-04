type FinoRiseLogoProps = {
  size?: number;
  showWordmark?: boolean;
  variant?: "light" | "dark";
  className?: string;
};

/** Arch + rising trend mark — inspired by bridge-style ed-tech logos */
export default function FinoRiseLogo({
  size = 40,
  showWordmark = false,
  variant = "dark",
  className = "",
}: FinoRiseLogoProps) {
  const textColor = variant === "light" ? "#fff" : "#0f172a";
  const subColor = variant === "light" ? "rgba(255,255,255,0.75)" : "#64748b";

  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
        style={{ flexShrink: 0 }}
      >
        <rect width="48" height="48" rx="12" fill={variant === "light" ? "rgba(255,255,255,0.15)" : "#1e3a8a"} />
        <path
          d="M10 32C10 32 14 18 24 14C34 18 38 32 38 32"
          stroke={variant === "light" ? "#fff" : "#60a5fa"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M14 30L22 22L28 26L36 16"
          stroke={variant === "light" ? "#fff" : "#93c5fd"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="16" r="2.5" fill={variant === "light" ? "#fff" : "#38bdf8"} />
      </svg>
      {showWordmark && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", color: textColor }}>
            FinoRise
          </span>
          <span style={{ fontSize: "0.65rem", fontWeight: 500, color: subColor, letterSpacing: "0.04em" }}>
            FINANCIAL LITERACY
          </span>
        </div>
      )}
    </div>
  );
}
