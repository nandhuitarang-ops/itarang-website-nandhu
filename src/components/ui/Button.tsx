"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

    const variants = {
      primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/25",
      secondary: "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100",
      outline: "border-2 border-brand-500/20 text-brand-600 hover:bg-brand-50 hover:border-brand-500/40",
      ghost: "text-brand-600 hover:bg-brand-50/50",
      accent: "bg-gradient-to-r from-brand-500 to-accent-blue text-white shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    if (href) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
