import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import { Burger } from ".";

test("Should toggle state of expanded on click", () => {
  const ExampleCode = () => {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen(!open);
    return (
      <button data-testid="button" type="button" onClick={toggle}>
        <Burger data-testid="burger" open={open} />
      </button>
    );
  };

  render(<ExampleCode />);
  const button = screen.getByTestId("button");
  const burger = screen.getByTestId("burger");
  userEvent.click(button);
  expect(burger).toHaveAttribute("data-state", "true");
  userEvent.click(button);
  expect(burger).toHaveAttribute("data-state", "false");
});
