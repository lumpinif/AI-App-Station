import { FileSearch } from "lucide-react"

import { PageTitle } from "./page-title"

export function NotFound() {
  return (
    <div className="flex flex-col sm:pl-20">
      <div className="container lg:max-w-4xl">
        <div className="flex items-center gap-10">
          <FileSearch size="40px" />
          <PageTitle title="Page Not found - 404" className="font-medium" />
        </div>
        <p className="mt-4 pl-1">
          This link might be broken, deleted, or moved. Nevertheless, there’s
          nothing to see here...
        </p>
      </div>
    </div>
  )
}
