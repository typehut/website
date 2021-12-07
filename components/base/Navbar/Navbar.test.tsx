import { act, fireEvent, render } from "@testing-library/react";
import * as React from "react";

import { Navbar } from ".";

import type { NavbarTheme } from "@/components/base/Navbar/Navbar.types";
import type { Waypoint } from "@/lib/hooks/useWaypoint";

const sto = global.setTimeout;
const sleep = (msec: number) => new Promise((resolve) => sto(resolve, msec));

const scrollTo = async (y: number) => {
  fireEvent.scroll(window, { target: { scrollY: y } });
  await sleep(300);
  jest.advanceTimersToNextTimer(5);
};

describe("Navbar", () => {
  const raf = global.requestAnimationFrame;
  const caf = global.cancelAnimationFrame;

  beforeAll(() => {
    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb);
    global.cancelAnimationFrame = (cb) => clearTimeout(cb);
  });

  afterAll(() => {
    jest.useRealTimers();

    global.requestAnimationFrame = raf;
    global.cancelAnimationFrame = caf;
  });

  it("Should change class when scrollY crossed waypoint", async () => {
    const WAYPOINT = 48;
    const DEFAULT_THEME: NavbarTheme = {
      textColor: "primary-900",
      bgColor: "primary-50",
      logoColor: "primary-900",
      shadow: false,
    };
    const WAYPOINT_THEME: NavbarTheme = {
      textColor: "primary-50",
      bgColor: "primary-900",
      logoColor: "white",
      shadow: true,
    };

    const ExampleCode = () => {
      const [theme, setTheme] = React.useState(DEFAULT_THEME);
      const waypoints: Waypoint[] = [
        {
          y: WAYPOINT,
          handler: (isBelow) => {
            setTheme(isBelow ? WAYPOINT_THEME : DEFAULT_THEME);
          },
        },
      ];
      return (
        <>
          <Navbar theme={theme} waypoints={waypoints} />
          <div style={{ height: "1024px" }}></div>
        </>
      );
    };

    render(<ExampleCode />);

    const fixedElement = document.querySelector(".fixed");
    expect(fixedElement).toBeDefined();
    expect(fixedElement).toHaveClass(
      `text-${DEFAULT_THEME.textColor}`,
      `bg-${DEFAULT_THEME.bgColor}`
    );
    await act(() => scrollTo(WAYPOINT));

    expect(fixedElement).toHaveClass(
      `text-${DEFAULT_THEME.textColor}`,
      `bg-${DEFAULT_THEME.bgColor}`
    );
    await act(() => scrollTo(WAYPOINT + 1));

    expect(fixedElement).toHaveClass(
      `text-${WAYPOINT_THEME.textColor}`,
      `bg-${WAYPOINT_THEME.bgColor}`
    );
    await act(() => scrollTo(0));

    expect(fixedElement).toHaveClass(
      `text-${DEFAULT_THEME.textColor}`,
      `bg-${DEFAULT_THEME.bgColor}`
    );
  });
});
