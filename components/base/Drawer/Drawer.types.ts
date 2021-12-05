import type * as React from "react";

export interface DrawerProps
  extends React.PropsWithChildren<Record<string, unknown>> {
  className?: string;
}
