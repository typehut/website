import { useEventListener, useThrottledCallback } from "@react-hookz/web";
import * as React from "react";

import { WindowScrollPositionContext } from "@/lib/context/windowScrollPosition";
import { hasOwnProperty, isBrowser } from "@/lib/utils/misc";

export type Waypoint = (
  | {
      y: number;
    }
  | {
      ref: React.RefObject<Element>;
    }
) & { handler: (isBelow: boolean) => unknown; once?: boolean };

type WaypointMapValue = {
  y: number;
  handler: Waypoint["handler"];
  once?: Waypoint["once"];
  active: boolean;
  above: boolean;
  below: boolean;
};

const getOffset = (el: Element | null) => {
  const scroll = isBrowser ? scrollY : 0;
  const rect = el ? el.getBoundingClientRect() : { top: Infinity };
  return rect.top + scroll;
};

export const useWaypoint = (waypoints: Waypoint[]) => {
  const scrollY = React.useContext(WindowScrollPositionContext.y);
  const scrollYRef = React.useRef<number>(scrollY);
  const waypointMap = React.useRef<Map<Waypoint, WaypointMapValue>>(
    new Map<Waypoint, WaypointMapValue>()
  );

  const remapWaypoints = () => {
    waypoints.forEach((waypoint) => {
      const y = hasOwnProperty(waypoint, "y")
        ? waypoint.y + 1
        : getOffset(waypoint.ref.current);
      const mappedWaypoint = waypointMap.current.get(waypoint);
      waypointMap.current.set(waypoint, {
        y,
        handler: waypoint.handler,
        once: waypoint?.once,
        active: mappedWaypoint ? mappedWaypoint.active : true,
        above: mappedWaypoint ? mappedWaypoint.above : scrollYRef.current < y,
        below: mappedWaypoint ? mappedWaypoint.below : scrollYRef.current >= y,
      });
    });
  };

  // Remap when updated waypoints
  React.useEffect(remapWaypoints, [waypoints]);
  useEventListener(
    typeof window === "undefined" ? null : window,
    "resize",
    useThrottledCallback(remapWaypoints, [waypoints], 100),
    { passive: true }
  );

  React.useEffect(() => {
    waypointMap.current.forEach((waypoint) => {
      if (!waypoint.active) return;
      if (scrollY >= waypoint.y) {
        if (waypoint.above) {
          waypoint.handler(true);
          if (waypoint.once) waypoint.active = false;
        }
        waypoint.above = false;
        waypoint.below = true;
      } else if (scrollY < waypoint.y) {
        if (waypoint.below) {
          waypoint.handler(false);
        }
        waypoint.above = true;
        waypoint.below = false;
      }
    });
  }, [scrollY, waypointMap]);
};
