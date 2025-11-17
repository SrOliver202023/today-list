import { ButtonProps } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/shadcn-io/ripple-button";

export function Button({ className, ...props }: ButtonProps) {
  return <RippleButton>But</RippleButton>;
}
