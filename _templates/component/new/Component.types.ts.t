---
to: components/<%= category %>/<%= name %>/<%= name %>.types.ts
---
import type * as React from "react"

export interface <%= name %>Props extends React.PropsWithChildren<Record<string, unknown>> {
  foo?: boolean
}
