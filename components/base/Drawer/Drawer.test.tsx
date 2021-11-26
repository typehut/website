import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Drawer from ".";

import ToggleHamburger from "@/components/case/ToggleHamburger/ToggleHamburger";

test("Should toggle visibility when button was clicked", async () => {
  const id = "hoge";
  const ExampleCode = () => {
    const expanded = React.useState(false);
    const props = {
      id,
      expanded,
    };
    return (
      <>
        <ToggleHamburger target={id} expanded={expanded} />
        <Drawer {...props} />
      </>
    );
  };

  render(<ExampleCode />);
  const drawer = document.getElementById(id);
  if (!drawer) throw new Error("The Drawer is not found.");

  const button = screen.getByRole("button");
  expect(drawer).toHaveClass("invisible");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "on");
  fireEvent.transitionRun(drawer);
  fireEvent.transitionEnd(drawer);
  expect(drawer).not.toHaveClass("invisible");
});
