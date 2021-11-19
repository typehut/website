import {
  useEventListener,
  useIsomorphicLayoutEffect,
  useMountEffect,
  useThrottledCallback,
} from "@react-hookz/web";
import { RefObject, useState } from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

export type ScrollPosition = {
  x: number | null;
  y: number | null;
};

const useScrollPosition = <T extends EventTarget>(
  target: T | RefObject<T> | null | undefined,
  throttleDelay: number = 16
) => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: null,
    y: null,
  });
  const [tgt, setTarget] = useState<T | null>(
    target && hasOwnProperty(target, "current")
      ? target.current
      : target || null
  );

  const scrollHandler = useThrottledCallback(
    () => {
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
    },
    [tgt],
    throttleDelay
  );

  useIsomorphicLayoutEffect(() => {
    setTarget(
      target && hasOwnProperty(target, "current")
        ? target.current
        : target || null
    );
  }, [target]);

  useMountEffect(() => {
    scrollHandler();
  });

  useEventListener(target || null, "scroll", scrollHandler, { passive: true });

  return scrollPosition;
};

export default useScrollPosition;
