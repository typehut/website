import { NextPage as NextPageOrigin } from "next";

import { NavbarColor } from "@/components/Navbar";

export type NextPage<P = {}, IP = P> = NextPageOrigin<P, IP> & {
  theme?: NavbarColor;
  waypoint?: number;
};
