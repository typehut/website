import { render, screen } from "@testing-library/react";
import * as React from "react";

import Logo from ".";

test("Should have <img>", () => {
  const ExampleCode = () => {
    const props = {
      width: 200,
      height: 100,
      isWhite: false,
    };
    return <Logo {...props} />;
  };

  render(<ExampleCode />);
  expect(screen.getByRole("img"));
});
