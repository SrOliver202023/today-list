"use client";

import { SwitchTheme } from "@/components/switch-theme";
import { Card } from "@/components/ui-custom/card";
import Image from "next/image";
import { Text } from "@/components/ui-custom/text";
import { RippleButton } from "@/components/ui/shadcn-io/ripple-button";
import { SearchIcon, Sparkle } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type DemoCardProps = {
  theme: "light" | "dark";
};
function DemoCard({ theme = "light" }: DemoCardProps) {
  return (
    <div
      className={`${theme} p-4 bg-background flex flex-col w-full justify-center items-center`}
    >
      <Card
        className="w-full flex flex-col justify-between  max-w-md"
        theme={theme}
      >
        <div className="flex justify-between items-center">
          <Image
            className={`w-40 h-10 ${theme === "dark" ? "invert" : ""}`}
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={40}
            priority
          />

          <SwitchTheme />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <Text
            variant="subtitle"
            weight="medium"
            size="2xl"
            className="leading-7"
          >{`Theme: ${theme}`}</Text>
          <Text variant="description" weight="medium">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
            sint eum voluptates, architecto, impedit dolorem perspiciatis
            aliquid enim nobis dicta minima, repellendus excepturi doloribus ab
            totam veniam sit! Exercitationem, blanditiis.
          </Text>

          <div className="py-2 flex flex-col gap-2">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div className="py-4 gap-2 grid grid-cols-4">
            <RippleButton theme={theme}>Primary</RippleButton>
            <RippleButton variant={"link"} theme={theme}>
              Link
            </RippleButton>
            <RippleButton variant="outline" theme={theme}>
              Outlined
            </RippleButton>
            <RippleButton variant="ghost">Ghost</RippleButton>
            <RippleButton variant="destructive" theme={theme}>
              Destructive
            </RippleButton>
            <RippleButton variant="icon">
              <Sparkle />
            </RippleButton>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function PlayGround() {
  return (
    <div className="bg-zinc-700 flex min-h-screen items-center justify-center">
      <div className="flex w-full h-[calc(100vh-0rem)]">
        <DemoCard theme="dark" />
        <DemoCard theme="light" />
      </div>

      {/* <div className="flex w-full h-[calc(100vh-0rem)]">
        <DemoPallet theme="dark" />
        <DemoPallet theme="light" />
      </div> */}
    </div>
  );
}
