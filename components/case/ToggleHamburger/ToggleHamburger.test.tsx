import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import ToggleHamburger from ".";

test("Should toggle state of expanded on click", () => {
  const ExampleCode = () => {
    const [expanded, setExpanded] = React.useState(false);
    const props: React.ComponentPropsWithoutRef<typeof ToggleHamburger> = {
      target: "hoge",
      expanded,
      defaultExpanded: false,
      onExpandedChange: setExpanded,
    };
    return <ToggleHamburger {...props} />;
  };

  render(<ExampleCode />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("data-target", "#hoge");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "on");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "off");
});
