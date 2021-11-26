import clsx from "clsx";
import * as React from "react";

import useCssTransition from "@/lib/hooks/useCssTransition";
import useDocumentScrollable from "@/lib/hooks/useDocumentScrollable";
import useEnsuredForwardedRef from "@/lib/hooks/useEnsuredForwardedRef";

const NAME = "Drawer";
const CLOSE_BUTTON_EVENT_KEY = "Enter";

type BaseElement = React.ElementRef<"div">;
type BaseElementProps = JSX.IntrinsicElements["div"];
export interface DrawerProps extends React.PropsWithChildren<BaseElementProps> {
  id: string;
  expanded: [boolean, (value: React.SetStateAction<boolean>) => void];
}

const Drawer = React.forwardRef<BaseElement, DrawerProps>(
  (
    { children, id, expanded: [expanded, setExpanded], ...attrs }: DrawerProps,
    forwardedRef
  ) => {
    const ensuredForwardRef = useEnsuredForwardedRef<HTMLDivElement>(
      forwardedRef as React.MutableRefObject<HTMLDivElement>
    );
    const scrollingElementRef = React.useRef<HTMLDivElement>(null);
    const [invisible, setInvisible] = React.useState(true);
    const [translating, setTranslating] = React.useState(false);
    const closeDrawer = React.useCallback(
      () => setExpanded(false),
      [setExpanded]
    );
    const closeDrawerWithKeydown = React.useCallback<
      React.KeyboardEventHandler<HTMLDivElement>
    >(
      (event) => {
        if (event.key === CLOSE_BUTTON_EVENT_KEY) {
          closeDrawer();
        }
      },
      [closeDrawer]
    );
    const [, setDocumentScrollable] = useDocumentScrollable(
      scrollingElementRef,
      { reserveScrollBarGap: true }
    );

    React.useEffect(() => {
      setDocumentScrollable(!expanded);
    }, [expanded, setDocumentScrollable]);

    useCssTransition({
      ref: ensuredForwardRef,
      run: () => {
        setTranslating(true);
        if (invisible) setInvisible(false);
      },
      end: (e: Event) => {
        setTranslating(false);
        if (!expanded && !invisible) setInvisible(true);
      },
    });

    return (
      <>
        <div
          ref={ensuredForwardRef}
          id={id}
          {...attrs}
          className={clsx(
            "drawer fixed top-0 right-14 bottom-0 left-0 max-w-xs h-screen z-30 transition-transform duration-350 ease-out-sharp transform-gpu contain-content bg-white lg:hidden",
            {
              invisible: invisible,
              "-translate-x-full": !expanded,
            },
            attrs.className
          )}
          aria-label="Navigation drawer"
        >
          <div
            ref={scrollingElementRef}
            className="flex flex-col absolute top-0 right-0 bottom-32 left-0 overflow-y-auto h-full min-h-16"
          >
            <div className="pt-scroll-padding bg-primary-900"></div>
            {children}
          </div>
        </div>

        <div
          className={clsx(
            "drawer-backdrop fixed top-0 right-0 bottom-0 left-0 z-20 transition-opacity duration-200 bg-black bg-opacity-40 tap-highlight-transparent cursor-pointer lg:hidden",
            {
              invisible: invisible,
              "pointer-events-auto": expanded || translating,
              "opacity-0": !expanded,
            }
          )}
          role="button"
          tabIndex={-1}
          onClick={closeDrawer}
          onKeyDown={closeDrawerWithKeydown}
        ></div>
      </>
    );
  }
);

Drawer.displayName = NAME;
export default Drawer;
