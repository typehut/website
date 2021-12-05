import clsx from "clsx";
import * as React from "react";

import type { HeaderElementRef, HeaderProps } from "./Header.types";

const NAME = "Header";

export const Header = React.forwardRef<HeaderElementRef, HeaderProps>(
  ({ children, className: headerClassName, ...headerProps }, forwardedRef) => {
    return (
      <header
        {...headerProps}
        ref={forwardedRef}
        className={clsx(
          "-mt-scroll-padding pt-scroll-padding",
          headerClassName
        )}
      >
        {children}
      </header>
    );
  }
);

Header.displayName = NAME;
