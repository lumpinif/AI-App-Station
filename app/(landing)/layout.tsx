import { Suspense } from "react"

import { SiteHeader } from "@/components/layout/site-header/site-header"

interface LandingPageLayout {
  children: React.ReactNode
}

const LandingPageLayout = ({ children }: LandingPageLayout) => {
  return (
    <>
      <Suspense>
        <SiteHeader />
      </Suspense>
      <div>{children}</div>
    </>
  )
}

export default LandingPageLayout
