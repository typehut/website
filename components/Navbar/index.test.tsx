import { render, fireEvent } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import * as React from "react";

import Navbar from ".";

function scrollTo(y: number) {
  fireEvent.scroll(window, { target: { scrollY: y } });
  return wait(300);
}

test("Should toggle visibility when button was clicked", async () => {
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
  await scrollTo(waypoint);

  expect(fixedElement).toHaveClass("text-primary-900", "bg-primary-50");
  await scrollTo(waypoint + 1);
  expect(fixedElement).toHaveClass("text-primary-50", "bg-primary-900");
});
