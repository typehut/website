import { Disclosure, Transition } from "@headlessui/react";
import { Keys } from "@headlessui/react/dist/components/keyboard";
import * as React from "react";

import { Burger } from "@/components/base/Burger";
import { useKeydown } from "@/lib/hooks/useKeydown";
import { useScrollable } from "@/lib/hooks/useScrollable";

import type { DrawerProps } from "./Drawer.types";

const DrawerContent: React.FC<
  DrawerProps & { open: boolean; close: () => void }
> = ({ open, close, className, children }) => {
  const [, setScrollable] = useScrollable(
    typeof document === "undefined" ? null : document.scrollingElement
  );

  React.useEffect(() => {
    setScrollable(!open);
  }, [open, setScrollable]);

  useKeydown([Keys.Escape], close);

  return (
    <div className={className}>
      <Disclosure.Button className="relative z-20 tap-highlight-transparent focus:outline-transparent">
        <Burger
          open={open}
          aria-label="Toggle navigation"
          className="block w-12 h-12"
        />
      </Disclosure.Button>
      <Transition as={React.Fragment} unmount={false} show={open}>
        <Disclosure.Panel
          unmount={false}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-hidden={!open}
        >
          <Transition.Child
            as={React.Fragment}
            unmount={false}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Button
              as="div"
              className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-200"
            ></Disclosure.Button>
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            unmount={false}
            enter="duration-350 ease-out-sharp"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="duration-300 ease-out"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="fixed top-0 right-14 bottom-0 left-0 max-w-xs h-screen z-20 contain-content bg-white transition-transform transform-gpu">
              <div className="flex flex-col absolute top-0 right-0 bottom-32 left-0 overflow-y-auto h-full min-h-16">
                <div className="pt-scroll-padding bg-primary-900"></div>
                {children}
              </div>
            </div>
          </Transition.Child>
        </Disclosure.Panel>
      </Transition>
    </div>
  );
};

export const Drawer: React.FC<DrawerProps> = ({ children, className }) => {
  return (
    <Disclosure>
      {({ open, close }: { open: boolean; close: () => void }) => (
        <DrawerContent open={open} close={close} className={className}>
          {children}
        </DrawerContent>
      )}
    </Disclosure>
  );
};
