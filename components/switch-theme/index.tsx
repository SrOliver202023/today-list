"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";

export function SwitchTheme({ isInvert }: { isInvert?: boolean }) {
  const mounted = useMounted();
  const { theme, systemTheme, setTheme } = useTheme();

  if (!mounted) return null;

  const currentTheme = theme ?? systemTheme ?? "none";

  const invert = (value: "dark" | "light") => {
    if (!isInvert) return value;
    return value === "dark" ? "light" : "dark";
  };

  return (
    <div className="flex items-center gap-2 w-fit">
      <Sun className="w-4 h-4" />
      <Switch
        onCompositionEnd={() => <>helo</>}
        checked={currentTheme === invert("dark")}
        onCheckedChange={() =>
          setTheme(invert(currentTheme === "dark" ? "light" : "dark"))
        }
      />
      <Moon className="w-4 h-4" />
    </div>
  );
}
