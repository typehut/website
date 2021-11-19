import { composeEventHandlers } from "@radix-ui/primitive";
import { Primitive } from "@radix-ui/react-primitive";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import * as React from "react";

import type * as Radix from "@radix-ui/react-primitive";

const NAME = "ToggleExpand";

type BaseElement = React.ElementRef<typeof Primitive.button>;
type BaseElementProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
export interface ToggleExpandProps extends BaseElementProps {
  target: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?(expanded: boolean): void;
}

const ToggleExpand = React.forwardRef<BaseElement, ToggleExpandProps>(
  (props, forwardedRef) => {
    const {
      target: targetProp,
      expanded: expandedProp,
      defaultExpanded = false,
      onExpandedChange,
      ...buttonProps
    } = props;

    const [expanded = false, setExpanded] = useControllableState({
      prop: expandedProp,
      onChange: onExpandedChange,
      defaultProp: defaultExpanded,
    });

    return (
      <Primitive.button
        {...buttonProps}
        type="button"
        aria-expanded={expanded}
        aria-controls={targetProp}
        data-target={`#${targetProp}`}
        data-state={expanded ? "on" : "off"}
        data-disabled={props.disabled ? "" : undefined}
        data-toggle="collapse"
        ref={forwardedRef}
        onClick={composeEventHandlers(props.onClick, () => {
          if (!props.disabled) {
            setExpanded(!expanded);
          }
        })}
      />
    );
  }
);

ToggleExpand.displayName = NAME;

export default ToggleExpand;
