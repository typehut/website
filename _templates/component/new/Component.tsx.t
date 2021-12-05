---
to: components/<%= category %>/<%= name %>/<%= name %>.tsx
---
import * as React from "react"
import type { <%= name %>Props } from "./<%= name %>.types"

export const <%= name %>: React.FC<<%= name %>Props> = ({ children }) => {
  return (
    <h1>
      {children}
    </h1>
  )
}
