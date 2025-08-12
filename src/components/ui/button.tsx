"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
        outline: "border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/10",
        secondary: "bg-[#f3f4f6] text-gray-900 hover:bg-[#e5e7eb]",
        ghost: "hover:bg-[#f3f4f6] text-gray-900",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 py-1 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
