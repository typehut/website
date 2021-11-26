import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { useEffect, useState, RefObject } from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

const useDocumentScrollable = <T extends HTMLElement>(
  target: T | RefObject<T>,
  options?: Parameters<typeof disableBodyScroll>[1]
) => {
  const [scrollable, setScrollable] = useState<boolean>(true);

  useEffect(() => {
    const copyRef = target;
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
        copyRef && hasOwnProperty(copyRef, "current")
          ? copyRef.current
          : copyRef || null;
      if (tgt) {
        enableBodyScroll(tgt);
      }
      clearAllBodyScrollLocks();
    };
  }, [target, scrollable, options]);

  return [scrollable, setScrollable] as const;
};

export default useDocumentScrollable;
