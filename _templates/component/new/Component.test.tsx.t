---
to: components/<%= category %>/<%= name %>/<%= name %>.test.tsx
---
import { render } from "@testing-library/react"
import * as React from "react"
import { <%= name %> } from "."

describe("<%= name %>", () => {
  it("should be defined", () => {
    expect(<%= name %>).toBeDefined()
  })

  it("should render", () => {
    const Component: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({
      children,
    }) => {
      return <<%= name %>>{children}</<%= name %>>
    }

    const Example: React.VFC<Record<string, never>> = () => {
      return <Component>testing</Component>
    }

    const { container } = render(<Example />)

    expect(container.firstChild).toMatchInlineSnapshot(`
      <h1>
        testing
      </h1>
    `)
  })
})
