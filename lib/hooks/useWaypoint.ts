import { RefObject, useMemo } from "react";

import useScrollPosition from "@/lib/hooks/useScrollPosition";

const useWaypoint = <T extends EventTarget>(
  target: T | RefObject<T> | null | undefined,
  waypoint: number
) => {
  const { y } = useScrollPosition(target);
  return useMemo(() => (y || 0) > waypoint, [y, waypoint]);
};

export default useWaypoint;
