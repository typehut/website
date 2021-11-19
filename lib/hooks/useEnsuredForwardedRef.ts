import { MutableRefObject, useEffect, useRef } from "react";

const useEnsuredForwardedRef = <T>(
  forwardedRef: MutableRefObject<T>
): MutableRefObject<T> => {
  const ensuredRef = useRef(forwardedRef && forwardedRef.current);

  useEffect(() => {
    if (!forwardedRef) {
      return;
    }
    forwardedRef.current = ensuredRef.current;
  }, [forwardedRef]);

  return ensuredRef;
};

export default useEnsuredForwardedRef;
