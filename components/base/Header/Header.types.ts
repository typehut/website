export type HeaderElementRef = React.ElementRef<"header">;

export type HeaderElementProps = JSX.IntrinsicElements["header"];

export interface HeaderProps
  extends React.PropsWithChildren<HeaderElementProps> {}
