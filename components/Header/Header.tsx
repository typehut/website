import clsx from "clsx";
import * as React from "react";

const NAME = "Header";

type BaseElement = React.ElementRef<"header">;
type BaseElementProps = JSX.IntrinsicElements["header"];
export interface HeaderProps
  extends React.PropsWithChildren<BaseElementProps> {}

const Header = React.forwardRef<BaseElement, HeaderProps>(
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

export default Header;
