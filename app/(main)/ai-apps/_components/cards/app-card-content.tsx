import React from "react"

import { AppCardProps } from "@/types/db_tables"

const AppCardContent: React.FC<AppCardProps> = ({ title, categories }) => {
  return (
    <>
      {/* TODO: CHANGE THE URL TO APP.SLUG */}
      <div className="flex flex-col gap-y-2 border">
        <span>{title}</span>
        <span>{categories}</span>
      </div>
    </>
  )
}

export default AppCardContent
