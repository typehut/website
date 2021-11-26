import * as React from "react";

import useScrollPosition from "@/lib/hooks/useScrollPosition";

const useWaypoint = <T extends EventTarget>(
  target: T | React.RefObject<T> | null | undefined,
  waypoint: number
) => {
  const { y } = useScrollPosition(target);
  return React.useMemo(() => (y || 0) > waypoint, [y, waypoint]);
};

export default useWaypoint;
