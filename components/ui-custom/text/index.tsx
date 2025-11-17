"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("", {
  variants: {
    variant: {
      title: "text-foreground font-bold",
      subtitle: "text-foreground/90 font-medium",
      description: "text-muted-foreground",
      muted: "text-muted-foreground/80",
    },

    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },

    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },

  defaultVariants: {
    variant: "description",
    size: "md",
    weight: "normal",
    align: "left",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

export function Text({
  className,
  variant,
  size,
  weight,
  align,
  asChild,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn(textVariants({ variant, size, weight, align }), className)}
      {...props}
    />
  );
}
