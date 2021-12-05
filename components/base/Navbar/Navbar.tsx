import { useMediaQuery } from "@react-hookz/web";
import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

import { Drawer } from "@/components/base/Drawer";
import { Logo } from "@/components/base/Logo";
import { useWaypoint } from "@/lib/hooks/useWaypoint";
import { getConfig } from "@/lib/utils/config";
import { NAV_ITEMS, SCREEN_SIZE_QUERIES } from "@/lib/utils/constant";
import { NavbarItem } from "./NavbarItem";

import type { NavbarProps, NavbarTheme } from "./Navbar.types";

const {
  publicRuntimeConfig: { siteName },
} = getConfig();

const DEFAULT_THEME: NavbarTheme = {
  textColor: "primary-50",
  bgColor: "primary-900",
  logoColor: "white",
  shadow: true,
};

export const Navbar: React.VFC<NavbarProps> = ({
  className,
  theme = DEFAULT_THEME,
  waypoints = [],
}) => {
  const isLargeScreen = useMediaQuery(SCREEN_SIZE_QUERIES.lg);

  useWaypoint(waypoints);

  return (
    <>
      <div
        className={clsx(
          "relative h-scroll-padding z-40 w-full duration-300",
          className
        )}
      >
        <div
          className={clsx(
            "fixed h-scroll-padding left-0 top-0 w-full transition",
            [
              `text-${theme.textColor}`,
              `bg-${theme.bgColor}`,
              theme.shadow && `shadow-2xl`,
            ]
          )}
        >
          <div className="container mx-auto h-full relative flex items-stretch lg:justify-between">
            <Drawer className="lg:hidden" aria-hidden={isLargeScreen}>
              <nav>nav-content</nav>
            </Drawer>

            <div className="relative z-20 mr-12 flex flex-grow justify-center lg:(ml-0 mr-4 flex-none w-auto)">
              <Link href="/">
                <a
                  className="flex items-center justify-center w-full h-full"
                  title={siteName}
                >
                  <Logo
                    className={clsx("px-4 h-3.5", `var-${theme.logoColor}`)}
                  />
                </a>
              </Link>
            </div>
            <nav
              className="hidden flex-grow px-5 lg:(w-auto block)"
              aria-hidden={!isLargeScreen}
            >
              <ul className="flex h-full justify-center items-stretch">
                {NAV_ITEMS.map((item) => {
                  return (
                    <li key={item.label} className={clsx("text-lg mx-2")}>
                      <NavbarItem href={item.href}>{item.label}</NavbarItem>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="hidden lg:block" aria-hidden={!isLargeScreen}>
              <div className="flex h-full items-center">
                <button type="button" className="btn-secondary">
                  Btn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
