export interface ScrollPosition {
  isScrollingDown: boolean;
  x: number;
  y: number;
}

export interface ScrollPositionProviderProps {
  container?: Element | Window | React.RefObject<Element> | null;
  context: {
    isScrollingDown: React.Context<ScrollPosition["isScrollingDown"]>;
    x: React.Context<ScrollPosition["x"]>;
    y: React.Context<ScrollPosition["y"]>;
  };
}
