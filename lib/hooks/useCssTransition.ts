import { useEventListener } from "@react-hookz/web";
import * as React from "react";

export type useCssTransitionOptions<T extends EventTarget = EventTarget> = {
  ref: React.RefObject<T>;
  run?: () => void;
  start?: () => void;
  cancel?: () => void;
  end?: () => void;
};

const noop = () => {};
const eventListenerOptions: AddEventListenerOptions = { passive: true };

const useCssTransition = <T extends EventTarget = EventTarget>({
  ref,
  run,
  start,
  cancel,
  end,
}: useCssTransitionOptions<T>) => {
  useEventListener<EventTarget>(
    ref,
    "transitionrun",
    run ?? noop,
    eventListenerOptions
  );
  useEventListener<EventTarget>(
    ref,
    "transitionstart",
    start ?? noop,
    eventListenerOptions
  );
  useEventListener<EventTarget>(
    ref,
    "transitioncancel",
    cancel ?? end ?? noop,
    eventListenerOptions
  );
  useEventListener<EventTarget>(
    ref,
    "transitionend",
    end ?? noop,
    eventListenerOptions
  );
};

export default useCssTransition;
