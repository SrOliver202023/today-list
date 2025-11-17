// /components/ui/custom/card.tsx
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-xl border p-4 shadow-sm bg-card text-foreground",
  {
    variants: {
      theme: {
        system: "", // use global next-themes
        light: "light", // force light theme on this element
        dark: "dark", // force dark theme on this element
      },
    },
    defaultVariants: {
      theme: "system",
    },
  }
);

export type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

export function Card({ className, theme, ...props }: CardProps) {
  return <div className={cn(cardVariants({ theme }), className)} {...props} />;
}
