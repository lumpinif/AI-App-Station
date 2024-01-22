import { Suspense } from "react"

import { LoadingSpinner } from "@/components/layout/loading-spinner"
import { SideMenu } from "@/components/layout/side-menu/side-menu"

export default function AiAppsPage() {
  return (
    <>
      <SideMenu title="AI Apps" href="/writing" isInner>
        <Suspense fallback={<LoadingSpinner />}>
          {/* <WritingListLayout list={sortedPosts} /> */}
        </Suspense>
      </SideMenu>
    </>
  )
}
