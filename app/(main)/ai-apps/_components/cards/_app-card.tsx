import React, { lazy, Suspense } from "react"

import { AppCardProps } from "@/types/db_tables"

const AppCardContent = lazy(() => import("./app-card"))

const AppCard: React.FC<AppCardProps> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AppCardContent {...props} />
      </Suspense>
    </>
  )
}

export default AppCard
