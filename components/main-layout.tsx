"use client";

import { ReactNode } from "react";
import { PrimeReactProvider, PrimeReactPTOptions } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { usePassThrough } from "primereact/passthrough";
import { ThemeProvider } from "./next/themes-provider";

export function MainLayout({ children }: { children: ReactNode }) {
  const options: PrimeReactPTOptions = {};

  // Hook MUST be inside component
  const CustomTailwind = usePassThrough(Tailwind, options, {
    mergeSections: true,
    mergeProps: true,
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <PrimeReactProvider
        value={{
          ripple: true,
          autoZIndex: true,
          zIndex: {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100,
            toast: 1200,
          },
          pt: CustomTailwind,
        }}
      >
        {children}
      </PrimeReactProvider>
    </ThemeProvider>
  );
}
