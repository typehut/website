import * as React from "react";

import type { ScrollPosition } from "@/components/base/ScrollPositionProvider";

export const WindowScrollPositionContext = {
  isScrollingDown:
    React.createContext<ScrollPosition["isScrollingDown"]>(false),
  x: React.createContext<ScrollPosition["x"]>(0),
  y: React.createContext<ScrollPosition["y"]>(0),
};
