import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import * as React from "react";

import Drawer from "@/components/Drawer";
import HamburgerToggle from "@/components/HamburgerToggle";
import Logo from "@/components/Logo";
import useWaypoint from "@/lib/hooks/useWaypoint";

const NAME = "Navbar";

const NAV_ITEMS = [
  {
    href: "#home",
    label: "Home",
  },
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#why",
    label: "Why",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "/blog",
    label: "Blog",
  },
] as const;

export type NavbarColor = {
  text: string;
  bg: string;
  logo?: string;
  textScrolled?: string;
  bgScrolled?: string;
  logoScrolled?: string;
};

type BaseElement = React.ElementRef<"div">;
type BaseElementProps = JSX.IntrinsicElements["div"];
export interface NavbarProps extends BaseElementProps {
  activeItem?: typeof NAV_ITEMS[number]["label"];
  theme?: NavbarColor;
  waypoint?: number;
}

type NavbarItemProps = React.PropsWithChildren<{
  href: LinkProps["href"];
  isActive: boolean;
}>;

const NavbarItem = ({ children, href, isActive = false }: NavbarItemProps) => {
  return (
    <li className={clsx("text-lg mx-2", { active: isActive })}>
      <Link href={href}>
        <a className="flex items-center h-full px-1">{children}</a>
      </Link>
    </li>
  );
};

const Navbar = React.forwardRef<BaseElement, NavbarProps>(
  (props, forwardedRef) => {
    const {
      activeItem,
      theme: themeProp,
      waypoint = 48,
      className,
      ...divProps
    } = props;

    const drawerId = useId("drawer");
    const drawerRef = React.useRef<HTMLDivElement>(null);
    const expanded = React.useState(false);
    const crossed = useWaypoint(
      typeof window === "undefined" ? null : window,
      waypoint
    );

    const theme = React.useMemo(() => {
      const {
        text = "primary-50",
        bg = "primary-900",
        logo = "white",
        textScrolled,
        bgScrolled,
        logoScrolled,
      } = themeProp || {};
      return {
        text: crossed
          ? textScrolled
            ? `text-${textScrolled}`
            : `text-${text}`
          : `text-${text}`,
        bg: crossed
          ? bgScrolled
            ? `bg-${bgScrolled}`
            : `bg-${bg}`
          : `bg-${bg}`,
        logo: crossed
          ? logoScrolled
            ? `var-${logoScrolled}`
            : `var-${logo}`
          : `var-${logo}`,
        shadow:
          (crossed ? true : bg === "transparent" ? false : true) &&
          "shadow-2xl",
      };
    }, [themeProp, crossed]);

    const NavbarItems = NAV_ITEMS.map((item) => {
      return (
        <NavbarItem
          key={item.label}
          href={item.href}
          isActive={activeItem === item.label}
        >
          {item.label}
        </NavbarItem>
      );
    });

    return (
      <>
        <div
          {...divProps}
          ref={forwardedRef}
          className={clsx(
            "relative h-scroll-padding z-40 w-full duration-300",
            className
          )}
        >
          <div
            className={clsx("fixed h-scroll-padding left-0 top-0 w-full", [
              theme.text,
              theme.bg,
              theme.shadow,
            ])}
          >
            <nav className="container mx-auto h-full relative flex items-stretch lg:justify-between">
              <HamburgerToggle
                target={drawerId}
                expanded={expanded}
                aria-label="Toggle navigation"
                className="block w-12 h-12 lg:hidden"
              />
              <div className="mr-12 flex flex-grow justify-center lg:(ml-0 mr-4 flex-none w-auto)">
                <Link href="/">
                  <a className="flex items-center justify-center w-full h-full">
                    <Logo className={clsx("px-4 h-3.5", theme.logo)} />
                  </a>
                </Link>
              </div>
              <div className="hidden flex-grow px-5 lg:(w-auto block)">
                <ul className="flex h-full justify-center items-stretch">
                  {NavbarItems}
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

        <Drawer ref={drawerRef} id={drawerId} expanded={expanded}>
          <nav>nav-content</nav>
        </Drawer>
      </>
    );
  }
);

Navbar.displayName = NAME;

export default Navbar;
