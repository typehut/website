import { useIsomorphicLayoutEffect } from "@react-hookz/web";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { useState, RefObject } from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

const useDocumentScrollable = <T extends HTMLElement>(
  target: T | RefObject<T>,
  options?: Parameters<typeof disableBodyScroll>[1]
) => {
  const [scrollable, setScrollable] = useState<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined") return;

    const tgt =
      target && hasOwnProperty(target, "current")
        ? target.current
        : target || null;
    if (!tgt) return;

    if (scrollable) {
      enableBodyScroll(tgt);
    } else {
      disableBodyScroll(tgt, options);
    }
    return () => {
      const tgt =
        target && hasOwnProperty(target, "current")
          ? target.current
          : target || null;
      if (tgt) {
        enableBodyScroll(tgt);
      }
      clearAllBodyScrollLocks();
    };
  }, [scrollable]);

  return [scrollable, setScrollable] as const;
};

export default useDocumentScrollable;
