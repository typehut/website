import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import Drawer from ".";

import ToggleHamburger from "@/components/case/ToggleHamburger/ToggleHamburger";

test("Should toggle visibility when button was clicked", async () => {
  const ID = "hoge";
  const ExampleCode = () => {
    const [expanded, setExpanded] = React.useState(false);
    const controllableProps = {
      expanded,
      defaultExpanded: false,
      onExpandedChange: setExpanded,
    };
    return (
      <>
        <ToggleHamburger target={ID} {...controllableProps} />
        <Drawer id={ID} {...controllableProps} />
      </>
    );
  };

  render(<ExampleCode />);
  const drawer = document.getElementById(ID);
  if (!drawer) throw new Error("The Drawer is not found.");

  const buttons = screen.getAllByRole("button");
  expect(drawer).toHaveClass("invisible");
  userEvent.click(buttons[0]);
  expect(buttons[0]).toHaveAttribute("data-state", "on");
  fireEvent.transitionRun(drawer);
  fireEvent.transitionEnd(drawer);
  expect(drawer).not.toHaveClass("invisible");
});
