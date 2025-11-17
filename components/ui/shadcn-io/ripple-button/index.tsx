"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ---------------------------- Button Variants ---------------------------- */

const buttonVariants = cva(
  `relative overflow-hidden cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none 
   focus-visible:outline-none 
   focus-visible:ring-2 
   focus-visible:ring-ring 
   focus-visible:ring-offset-2 
   focus-visible:ring-offset-background
   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`,
  {
    variants: {
      theme: {
        dark: "dark",
        light: "light",
      },
      variant: {
        default: "bg-primary/80 hover:bg-primary text-primary-foreground",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/50",
        outline:
          "border border-primary/40 hover:bg-primary/40 hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-primary/40 hover:text-foreground",
        icon: "hover:bg-primary/40 hover:text-foreground select-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-8 has-[>svg]:px-6",
        icon: "size-10 p-0 flex items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/* ------------------------------ Ripple Shape ------------------------------ */

const rippleVariants = cva(
  "absolute pointer-events-none rounded-full opacity-80",
  {
    variants: {
      variant: {
        default: "bg-primary-foreground/80",
        destructive: "bg-white/80",
        outline: "bg-primary/60",
        secondary: "bg-secondary-foreground/80",
        ghost: "bg-foreground/60",
        icon: "bg-foreground/60",
        link: "bg-foreground/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ---------------------------- Component Types ---------------------------- */

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type RippleButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    rippleClassName?: string;
    scale?: number;
  };

/* ------------------------------ RippleButton ------------------------------ */

function RippleButton({
  children,
  onClick,
  variant,
  size,
  className,
  rippleClassName,
  scale = 4,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const createRipple = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, ripple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 450);
    },
    []
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick?.(e);
  };

  const tapAnim =
    variant === "icon"
      ? {}
      : {
          whileTap: { scale: 0.93 },
          whileHover: { scale: 1.03 },
        };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      {...tapAnim}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn(rippleVariants({ variant }), rippleClassName)}
          style={{
            top: r.y - 15,
            left: r.x - 15,
            width: 30,
            height: 30,
          }}
        />
      ))}
    </motion.button>
  );
}

export { RippleButton };
