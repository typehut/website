import type { DrawerProps } from "@/components/base/Drawer";

import type { LinkProps } from "next/link";
import type * as React from "react";

export type NavbarColors = {
  text: string;
  bg: string;
  logo?: string;
  textScrolled?: string;
  bgScrolled?: string;
  logoScrolled?: string;
};

export interface NavbarProps {
  colors?: NavbarColors;
  waypoint?: number;
  className?: string;
}

export interface NavbarItemProps extends React.PropsWithChildren<{}> {
  href: LinkProps["href"];
}

interface DrawerState extends DrawerProps {
  ref: React.RefObject<HTMLDivElement>;
}

interface ThemeState {
  colors: {
    text: string;
    bg: string;
    logo: string;
  };
  shadow: string | null;
}

export interface NavbarState {
  drawer: DrawerState;
  theme: ThemeState;
}
