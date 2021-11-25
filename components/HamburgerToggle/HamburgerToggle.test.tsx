import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import HamburgerToggle from "./HamburgerToggle";

test("Should toggle state of expanded on click", () => {
  const ExampleCode = () => {
    const expanded = React.useState(false);
    const props = {
      target: "hoge",
      expanded,
    };
    return <HamburgerToggle {...props} />;
  };

  render(<ExampleCode />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("data-target", "#hoge");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "on");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "off");
});
