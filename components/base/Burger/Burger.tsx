import clsx from "clsx";
import * as React from "react";

import type { BurgerElementRef, BurgerProps } from "./Burger.types";

const NAME = "Burger";

const Line: React.VFC<{
  className: Parameters<typeof clsx>[number];
}> = ({ className }) => {
  return (
    <span
      className={clsx(
        "block absolute border-t-2 border-solid border-current w-full left-0 transform-gpu transition-transform-opacity ease-in-out duration-250 rounded",
        className
      )}
    ></span>
  );
};

export const Burger = React.forwardRef<BurgerElementRef, BurgerProps>(
  ({ open, ...BurgerProps }, forwardedRef) => {
    return (
      <div ref={forwardedRef} {...BurgerProps} data-state={open}>
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative overflow-hidden w-6 h-4">
            <Line
              className={{
                "top-0": !open,
                "top-1.75": open,
                "rotate-135": open,
              }}
            />
            <Line
              className={[
                "top-1.75",
                {
                  "opacity-0": open,
                  "-translate-x-full": open,
                },
              ]}
            />
            <Line
              className={{
                "bottom-0": !open,
                "bottom-1.75": open,
                "-rotate-135": open,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

Burger.displayName = NAME;
