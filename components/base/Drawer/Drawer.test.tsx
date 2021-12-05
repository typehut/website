import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import { Drawer } from ".";

test("Should toggle visibility when button was clicked", async () => {
  render(<Drawer>testing</Drawer>);
  const root = globalThis.document.querySelector("div");
  expect(root).toBeDefined();
  const panel = root?.querySelector("div.fixed");
  const button = root?.querySelector("button");
  expect(panel).toBeDefined();
  expect(button).toBeDefined();
  expect(panel).toHaveAttribute("aria-hidden", "true");
  expect(button).toHaveAttribute("aria-expanded", "false");
  userEvent.click(button!);
  expect(panel).toHaveAttribute("aria-hidden", "false");
  expect(button).toHaveAttribute("aria-expanded", "true");
});
