import clsx from "clsx";
import * as React from "react";

import ToggleExpand from "@/components/ToggleExpand";

// <AvoidPurge block absolute border-t-2 border-solid border-current w-full left-0 transform-gpu transition-transform-opacity ease-in-out duration-250 rounded />

const NAME = "HamburgerToggle";
const LINE_COMMON_CLASSNAME =
  "block absolute border-t-2 border-solid border-current w-full left-0 transform-gpu transition-transform-opacity ease-in-out duration-250 rounded";

type BaseElement = React.ElementRef<typeof ToggleExpand>;
type BaseElementProps = Omit<
  React.ComponentPropsWithoutRef<typeof ToggleExpand>,
  "expanded"
>;
export interface HamburgerToggleProps extends BaseElementProps {
  target: string;
  expanded: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const HamburgerToggle = React.forwardRef<BaseElement, HamburgerToggleProps>(
  (
    { target, expanded: [expanded, setExpanded], ...buttonProps },
    forwardedRef
  ) => {
    return (
      <ToggleExpand
        {...buttonProps}
        ref={forwardedRef}
        target={target}
        expanded={expanded}
        onExpandedChange={setExpanded}
        className={clsx(
          "cursor-pointer tap-highlight-transparent focus:outline-none",
          buttonProps.className
        )}
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="relative overflow-hidden w-6 h-4">
            <span
              className={clsx(LINE_COMMON_CLASSNAME, {
                "top-0": !expanded,
                "top-1_75": expanded,
                "rotate-135": expanded,
              })}
            ></span>
            <span
              className={clsx(LINE_COMMON_CLASSNAME, "top-1_75", {
                "opacity-0": expanded,
                "-translate-x-full": expanded,
              })}
            ></span>
            <span
              className={clsx(LINE_COMMON_CLASSNAME, {
                "bottom-0": !expanded,
                "bottom-1_75": expanded,
                "-rotate-135": expanded,
              })}
            ></span>
          </div>
        </div>
      </ToggleExpand>
    );
  }
);

HamburgerToggle.displayName = NAME;

export default HamburgerToggle;
