export type BurgerElementRef = React.ElementRef<"div">;

export type BurgerElementProps = React.ComponentPropsWithoutRef<"div">;

export interface BurgerProps extends BurgerElementProps {
  open: boolean;
}
