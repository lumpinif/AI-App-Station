import { Suspense } from "react"

import { SiteHeader } from "@/components/layout/site-header/site-header"

interface MainAppLayout {
  children: React.ReactNode
}

const MainAppLayout = ({ children }: MainAppLayout) => {
  return (
    <>
      <Suspense>
        <SiteHeader />
      </Suspense>
      <main>{children}</main>
    </>
  )
}

export default MainAppLayout
