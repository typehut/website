import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import * as React from "react";

import { hasOwnProperty } from "@/lib/utils/misc";

export const useScrollable = <T extends Element>(
  target: T | React.RefObject<T> | null,
  options?: Parameters<typeof disableBodyScroll>[1]
) => {
  const [scrollable, setScrollable] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!target) return;
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
