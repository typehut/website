import { render, screen } from "@testing-library/react";
import * as React from "react";

import Header from ".";

test("Should have children", () => {
  const testMessage = "Test Message";

  render(
    <Header>
      <p>{testMessage}</p>
    </Header>
  );
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});

test("Should have <header>", () => {
  render(<Header></Header>);
  expect(screen.getByRole("banner")).toBeInTheDocument();
});
