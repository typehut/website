import * as React from "react";

import { useCallbackRef } from "./useCallbackRef";

export const useKeydown = (
  keys: string[],
  handler?: (event: KeyboardEvent) => void
) => {
  const onKeyDownHandler = useCallbackRef(handler);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.some((key) => event.key === key)) {
        onKeyDownHandler(event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keys, onKeyDownHandler]);
};
