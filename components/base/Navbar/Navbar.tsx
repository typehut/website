import clsx from "clsx";
import Link from "next/link";
import * as React from "react";

import NavbarItem from "./NavbarItem";
import useNavbar from "./useNavbar";

import Drawer from "@/components/base/Drawer";
import Logo from "@/components/base/Logo";
import ToggleHamburger from "@/components/case/ToggleHamburger/ToggleHamburger";
import getConfig from "@/lib/utils/config";
import { NAV_ITEMS } from "@/lib/utils/constant";

import type { NavbarProps } from "./Navbar.types";

const NAME = "Navbar";

const { publicRuntimeConfig } = getConfig();

const Navbar: React.VFC<NavbarProps> = (props) => {
  const { className } = props;
  const state = useNavbar(props);

  return (
    <>
      <div
        className={clsx(
          "relative h-scroll-padding z-40 w-full duration-300",
          className
        )}
      >
        <div
          className={clsx("fixed h-scroll-padding left-0 top-0 w-full", [
            state.theme.colors.text,
            state.theme.colors.bg,
            state.theme.shadow,
          ])}
        >
          <nav className="container mx-auto h-full relative flex items-stretch lg:justify-between">
            <ToggleHamburger
              target={state.drawer.id}
              expanded={state.drawer.expanded}
              aria-label="Toggle navigation"
              className="block w-12 h-12 lg:hidden"
            />
            <div className="mr-12 flex flex-grow justify-center lg:(ml-0 mr-4 flex-none w-auto)">
              <Link href="/">
                <a
                  className="flex items-center justify-center w-full h-full"
                  title={publicRuntimeConfig.siteName}
                >
                  <Logo
                    className={clsx("px-4 h-3.5", state.theme.colors.logo)}
                  />
                </a>
              </Link>
            </div>
            <div className="hidden flex-grow px-5 lg:(w-auto block)">
              <ul className="flex h-full justify-center items-stretch">
                {NAV_ITEMS.map((item) => {
                  return (
                    <li key={item.label} className={clsx("text-lg mx-2")}>
                      <NavbarItem href={item.href}>{item.label}</NavbarItem>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="hidden lg:block">
              <div className="flex h-full items-center">
                <button type="button" className="btn-secondary">
                  Btn
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <Drawer {...state.drawer}>
        <nav>nav-content</nav>
      </Drawer>
    </>
  );
};

Navbar.displayName = NAME;

export default Navbar;
