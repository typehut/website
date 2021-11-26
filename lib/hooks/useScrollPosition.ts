import {
  useEventListener,
  useMountEffect,
  useRafCallback,
} from "@react-hookz/web";
import * as React from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

export type ScrollPosition = {
  x: number | null;
  y: number | null;
};

const useScrollPosition = <T extends EventTarget>(
  target: T | React.RefObject<T> | null | undefined
) => {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>({
    x: null,
    y: null,
  });

  const [scrollHandler] = useRafCallback(() => {
    const tgt =
      target && hasOwnProperty(target, "current")
        ? target.current
        : target || null;
    if (!tgt) return;
    const x = hasOwnProperty(tgt, "scrollX")
      ? (tgt.scrollX as number)
      : hasOwnProperty(tgt, "scrollLeft")
      ? (tgt.scrollLeft as number)
      : null;
    const y = hasOwnProperty(tgt, "scrollY")
      ? (tgt.scrollY as number)
      : hasOwnProperty(tgt, "scrollTop")
      ? (tgt.scrollTop as number)
      : null;
    setScrollPosition({ x, y });
  });

  useMountEffect(scrollHandler);

  useEventListener(target || null, "scroll", scrollHandler, { passive: true });

  return scrollPosition;
};

export default useScrollPosition;
