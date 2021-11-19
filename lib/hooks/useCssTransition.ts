import { useEventListener } from "@react-hookz/web";
import * as React from "react";

export type useCssTransitionOptions<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  run?: () => void;
  start?: () => void;
  cancel?: () => void;
  end?: () => void;
};

const noop = () => {};
const eventListenerOptions: AddEventListenerOptions = { passive: true };

const useCssTransition = <T extends HTMLElement>({
  ref,
  run,
  start,
  cancel,
  end,
}: useCssTransitionOptions<T>) => {
  useEventListener<HTMLElement>(
    ref,
    "transitionrun",
    run ?? noop,
    eventListenerOptions
  );
  useEventListener<HTMLElement>(
    ref,
    "transitionstart",
    start ?? noop,
    eventListenerOptions
  );
  useEventListener<HTMLElement>(
    ref,
    "transitioncancel",
    cancel ?? end ?? noop,
    eventListenerOptions
  );
  useEventListener<HTMLElement>(
    ref,
    "transitionend",
    end ?? noop,
    eventListenerOptions
  );
};

export default useCssTransition;
