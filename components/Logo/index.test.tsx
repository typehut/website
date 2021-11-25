import { render, screen } from "@testing-library/react";
import * as React from "react";

import Logo from ".";

test("Should have <svg>", () => {
  const ExampleCode = () => {
    const props = {
      width: 200,
      height: 100,
    };
    return <Logo {...props} />;
  };

  render(<ExampleCode />);
  const svg = globalThis.document.querySelector("svg");
  expect(svg).not.toBeNull();
});
