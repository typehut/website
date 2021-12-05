import { useEventListener, useRafCallback } from "@react-hookz/web";
import constate from "constate";
import * as React from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

export interface ScrollPosition {
  isScrollingDown: boolean;
  x: number;
  y: number;
}

const useScrollPositionProvider = ({
  container,
}: {
  container: Element | Window | React.RefObject<Element> | null;
}) => {
  const scrollContainer = container
    ? hasOwnProperty(container, "current")
      ? container.current
      : container
    : null;

  // `useRef` instead of `useState` to persist scroll state without re-render
  const isScrollingDown = React.useRef(false);
  const scrollX = React.useRef(0);
  const scrollY = React.useRef(0);

  // trigger re-render by setting these
  const [isScrollingDownValue, setIsScrollingDownValue] = React.useState(false);
  const [scrollXValue, setScrollXValue] = React.useState(0);
  const [scrollYValue, setScrollYValue] = React.useState(0);

  // handle scroll
  const [onScroll] = useRafCallback(() => {
    if (!scrollContainer) return;
    // `scrollX` for `window`, `scrollLeft` for an element
    const scrollContainerX = hasOwnProperty(scrollContainer, "scrollLeft")
      ? scrollContainer.scrollLeft
      : scrollContainer.scrollX;

    // `scrollY` for `window`, `scrollTop` for an element
    const scrollContainerY = hasOwnProperty(scrollContainer, "scrollTop")
      ? scrollContainer.scrollTop
      : scrollContainer.scrollY;

    // if scroll has changed
    if (
      scrollContainerX !== scrollX.current ||
      scrollContainerY !== scrollY.current
    ) {
      const prevValue = {
        isScrollingDown: isScrollingDown.current,
        scrollX: scrollX.current,
        scrollY: scrollY.current,
      };
      isScrollingDown.current = scrollContainerY > scrollY.current;
      scrollX.current = scrollContainerX;
      scrollY.current = scrollContainerY;

      // trigger re-render
      if (prevValue.isScrollingDown !== isScrollingDown.current) {
        setIsScrollingDownValue(isScrollingDown.current);
      }
      if (prevValue.scrollX !== scrollX.current) {
        setScrollXValue(scrollX.current);
      }
      if (prevValue.scrollY !== scrollY.current) {
        setScrollYValue(scrollY.current);
      }
    }
  });

  useEventListener(scrollContainer, "scroll", onScroll, {
    passive: true,
  });
  useEventListener(scrollContainer, "resize", onScroll, { passive: true });

  return {
    isScrollingDown: isScrollingDownValue,
    x: scrollXValue,
    y: scrollYValue,
  };
};

const [ScrollPositionProvider, useScrollPositionContext] = constate(
  useScrollPositionProvider
);

export { ScrollPositionProvider, useScrollPositionContext };
