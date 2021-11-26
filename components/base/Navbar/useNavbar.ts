import { useId } from "@radix-ui/react-id";
import * as React from "react";

import useWaypoint from "@/lib/hooks/useWaypoint";

import type { NavbarProps, NavbarState } from "./Navbar.types";

const useNavbar = (props: NavbarProps) => {
  const { colors, waypoint = 48 } = props;
  const normalizedColors = {
    text: colors?.text || "primary-50",
    bg: colors?.bg || "primary-900",
    logo: colors?.logo || "white",
    textScrolled: colors?.textScrolled || colors?.text || "primary-50",
    bgScrolled: colors?.bgScrolled || colors?.bg || "primary-900",
    logoScrolled: colors?.logoScrolled || colors?.logo || "white",
  };

  const drawerRef = React.useRef<HTMLDivElement>(null);
  const drawerId = useId("drawer");
  const [drawerExpanded, drawerSetExpanded] = React.useState(false);
  const crossed = useWaypoint(
    typeof window === "undefined" ? null : window,
    waypoint
  );

  const state: NavbarState = {
    drawer: {
      ref: drawerRef,
      id: drawerId,
      expanded: drawerExpanded,
      defaultExpanded: false,
      onExpandedChange: drawerSetExpanded,
    },

    theme: {
      colors: {
        text: `text-${
          crossed ? normalizedColors.textScrolled : normalizedColors.text
        }`,
        bg: `bg-${crossed ? normalizedColors.bgScrolled : normalizedColors.bg}`,
        logo: `var-${
          crossed ? normalizedColors.logoScrolled : normalizedColors.logo
        }`,
      },

      shadow: (
        crossed
          ? normalizedColors.bgScrolled !== "transparent"
          : normalizedColors.bg !== "transparent"
      )
        ? "shadow-2xl"
        : null,
    },
  };

  return state;
};

export default useNavbar;
