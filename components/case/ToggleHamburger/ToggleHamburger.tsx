import clsx from "clsx";
import * as React from "react";

import ToggleExpand from "@/components/case/ToggleExpand";

const NAME = "ToggleHamburger";

type BaseElement = React.ElementRef<typeof ToggleExpand>;
type BaseElementProps = React.ComponentPropsWithoutRef<typeof ToggleExpand>;
export interface ToggleHamburgerProps extends BaseElementProps {
  target: string;
}

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

const ToggleHamburger = React.forwardRef<BaseElement, ToggleHamburgerProps>(
  (
    {
      target,
      expanded,
      defaultExpanded = false,
      onExpandedChange,
      ...buttonProps
    },
    forwardedRef
  ) => {
    return (
      <ToggleExpand
        {...buttonProps}
        ref={forwardedRef}
        target={target}
        expanded={expanded}
        defaultExpanded={defaultExpanded}
        onExpandedChange={onExpandedChange}
        className={clsx(
          "cursor-pointer tap-highlight-transparent focus:outline-none",
          buttonProps.className
        )}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative overflow-hidden w-6 h-4">
            <Line
              className={{
                "top-0": !expanded,
                "top-1.75": expanded,
                "rotate-135": expanded,
              }}
            />
            <Line
              className={[
                "top-1.75",
                {
                  "opacity-0": expanded,
                  "-translate-x-full": expanded,
                },
              ]}
            />
            <Line
              className={{
                "bottom-0": !expanded,
                "bottom-1.75": expanded,
                "-rotate-135": expanded,
              }}
            />
          </div>
        </div>
      </ToggleExpand>
    );
  }
);

ToggleHamburger.displayName = NAME;

export default ToggleHamburger;
