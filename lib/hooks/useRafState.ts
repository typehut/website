import { useUnmountEffect } from "@react-hookz/web";
import * as React from "react";

import { isBrowser } from "@/lib/utils/misc";

export const useRafState = <S>(
  initialState: S | (() => S)
): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const frame = React.useRef(0);
  const [state, setState] = React.useState(initialState);

  const setRafState = React.useCallback((value: S | ((prevState: S) => S)) => {
    if (!isBrowser) return;

    window.cancelAnimationFrame(frame.current);

    frame.current = window.requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmountEffect(() => {
    window.cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
};
