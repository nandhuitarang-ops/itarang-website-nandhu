import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  dark = false,
  className,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-16 md:mb-20",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-sm font-semibold tracking-wide rounded-full border",
            dark
              ? "text-brand-300 bg-brand-500/10 border-brand-500/20"
              : "text-brand-600 bg-brand-500/5 border-brand-500/10"
          )}
        >
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            dark ? "bg-brand-400" : "bg-brand-500"
          )} />
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]",
          dark ? "text-white" : "text-dark-900",
          gradient && "gradient-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg md:text-xl leading-relaxed",
            dark ? "text-white/50" : "text-dark-600/70",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
