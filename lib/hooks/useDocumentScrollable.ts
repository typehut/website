import { useIsomorphicLayoutEffect } from "@react-hookz/web";
import { useState } from "react";

const useDocumentScrollable = () => {
  const [scrollable, setScrollable] = useState<boolean>(true);

  useIsomorphicLayoutEffect(() => {
    if (typeof document === "undefined") return;
    if (scrollable) {
      document.body.style.removeProperty("overflow");
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [scrollable]);

  return [scrollable, setScrollable] as const;
};

export default useDocumentScrollable;
