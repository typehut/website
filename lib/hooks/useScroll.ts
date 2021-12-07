import * as React from "react";

import { isRef, isWindow } from "@/lib/utils/misc";
import { useRafState } from "./useRafState";

export interface State {
  x: number;
  y: number;
  isScrollingDown: boolean;
}

export const useScroll = (
  target: Window | HTMLElement | React.RefObject<HTMLElement> | null
): State => {
  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
    isScrollingDown: false,
  });

  React.useEffect(() => {
    if (!target) return;
    const el = isRef<HTMLElement>(target) ? target.current : target;

    const handler = () => {
      if (el) {
        const _isWindow = isWindow(el);
        setState({
          x: _isWindow ? el.scrollX : el.scrollLeft,
          y: _isWindow ? el.scrollY : el.scrollTop,
          isScrollingDown: (_isWindow ? el.scrollY : el.scrollTop) > state.y,
        });
      }
    };

    if (el) {
      el.addEventListener("scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return state;
};
