import { render, fireEvent, act } from "@testing-library/react";
import * as React from "react";

import Navbar from ".";

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
    const waypoint = 48;

    const ExampleCode = () => {
      const props = {
        activeItem: "Home",
        theme: {
          text: "primary-900",
          bg: "primary-50",
          whiteLogo: false,
          textScrolled: "primary-50",
          bgScrolled: "primary-900",
          whiteLogoScrolled: true,
        },
        waypoint,
      } as const;
      return (
        <>
          <Navbar {...props} />
          <div style={{ height: "1024px" }}></div>
        </>
      );
    };

    render(<ExampleCode />);

    const fixedElement = document.querySelector(".fixed");
    if (!fixedElement) throw new Error("The fixed element is not found.");

    expect(fixedElement).toHaveClass("text-primary-900", "bg-primary-50");
    await act(() => scrollTo(waypoint));

    expect(fixedElement).toHaveClass("text-primary-900", "bg-primary-50");
    await act(() => scrollTo(waypoint + 1));

    expect(fixedElement).toHaveClass("text-primary-50", "bg-primary-900");
    await act(() => scrollTo(0));

    expect(fixedElement).toHaveClass("text-primary-900", "bg-primary-50");
  });
});
