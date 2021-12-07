import { useEventListener, useMap, useRafCallback } from "@react-hookz/web";
import * as React from "react";

import { hasOwnProperty, isBrowser } from "@/lib/utils/misc";

export type Waypoint = (
  | {
      y: number;
    }
  | {
      ref: React.RefObject<Element>;
      offset?: number;
    }
) & { handler: (isBelow: boolean) => unknown; once?: boolean };

const getOffset = (el: Element | null) => {
  const scroll = isBrowser ? window.scrollY : 0;
  const rect = el ? el.getBoundingClientRect() : { top: Infinity };
  return rect.top + scroll;
};

export const useWaypoint = (waypoints: Waypoint[]) => {
  const normalizedWaypoints = useMap<
    number,
    {
      y: number;
      handler: Waypoint["handler"];
      once: boolean;
    }
  >();
  const waypointsState = React.useRef(
    new Map<
      number,
      {
        active: boolean;
        above: boolean;
      }
    >()
  );

  const normalize = () => {
    const scrollY = isBrowser ? window.scrollY : 0;
    waypoints.forEach((waypoint, index) => {
      const y = hasOwnProperty(waypoint, "y")
        ? waypoint.y + 1
        : getOffset(waypoint.ref.current) + (waypoint?.offset || 0);
      if (!waypointsState.current.has(index)) {
        waypointsState.current.set(index, {
          active: true,
          above: scrollY < y,
        });
      }
      normalizedWaypoints.set(index, {
        y,
        handler: waypoint.handler,
        once: waypoint?.once || false,
      });
    });
  };

  const [onScroll] = useRafCallback(() => {
    normalizedWaypoints.forEach((waypoint, index) => {
      const state = waypointsState.current.get(index);
      if (!state || !state.active) return;
      if (window.scrollY >= waypoint.y) {
        if (state.above) {
          state.above = false;
          waypoint.handler(true);
          if (waypoint.once) state.active = false;
        }
      } else if (window.scrollY < waypoint.y) {
        if (!state.above) {
          state.above = true;
          waypoint.handler(false);
        }
      }
    });
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(normalize, [waypoints]);
  useEventListener(isBrowser ? window : null, "scroll", onScroll, {
    capture: false,
    passive: true,
  });
  useEventListener(isBrowser ? window : null, "resize", onScroll, {
    capture: false,
    passive: true,
  });
};
