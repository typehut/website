import {
  useEventListener,
  useRafCallback,
  useThrottledCallback,
} from "@react-hookz/web";
import * as React from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

import type { ScrollPositionProviderProps } from "./ScrollPositionProvider.types";

export const ScrollPositionProvider: React.FC<ScrollPositionProviderProps> = ({
  children,
  container,
  context: Context,
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
  const onScroll = React.useCallback(() => {
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
      isScrollingDown.current = scrollContainerY > scrollY.current;
      scrollX.current = scrollContainerX;
      scrollY.current = scrollContainerY;

      // trigger re-render
      setIsScrollingDownValue(isScrollingDown.current);
      setScrollXValue(scrollX.current);
      setScrollYValue(scrollY.current);
    }
  }, [scrollContainer]);

  useEventListener(scrollContainer, "scroll", useRafCallback(onScroll)[0], {
    passive: true,
  });
  useEventListener(
    scrollContainer,
    "resize",
    useThrottledCallback(onScroll, [scrollContainer], 100),
    { passive: true }
  );

  return (
    <Context.isScrollingDown.Provider value={isScrollingDownValue}>
      <Context.x.Provider value={scrollXValue}>
        <Context.y.Provider value={scrollYValue}>{children}</Context.y.Provider>
      </Context.x.Provider>
    </Context.isScrollingDown.Provider>
  );
};
