import type { LinkProps } from "next/link";
import type * as React from "react";
import type { Waypoint } from "@/lib/hooks/useWaypoint";

export interface NavbarTheme {
  textColor: string;
  bgColor: string;
  logoColor: string;
  shadow: boolean;
}

export interface NavbarProps {
  className?: string;
  theme?: NavbarTheme;
  waypoints?: Waypoint[];
}

export interface NavbarItemProps
  extends React.PropsWithChildren<Record<string, unknown>> {
  href: LinkProps["href"];
}
