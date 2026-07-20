import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-brand-600 to-accent-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:brightness-110",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
      outline:
        "border-2 border-brand-600 text-brand-600 hover:bg-brand-50",
      ghost:
        "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-8 py-3.5 text-base rounded-xl font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
