import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import ToggleExpand from ".";

test("Should toggle state of expanded on click", () => {
  const ExampleCode = () => {
    const [expanded, onExpandedChange] = React.useState(false);
    const props = {
      target: "hoge",
      expanded,
      onExpandedChange,
    };
    const testMessage = "Test Message";
    return <ToggleExpand {...props}>{testMessage}</ToggleExpand>;
  };

  render(<ExampleCode />);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("data-target", "#hoge");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "on");
  userEvent.click(button);
  expect(button).toHaveAttribute("data-state", "off");
});
