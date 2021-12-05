export type LogoElementRef = React.ElementRef<"svg">;
export type LogoElementProps = JSX.IntrinsicElements["svg"];

export interface LogoProps extends LogoElementProps {
  className?: string;
}
