import { FileSearch } from "lucide-react"

import { PageTitle } from "./page-title"

export function NotFound() {
  return (
    <div
      className="scrollable-area relative flex w-full flex-col"
      id="scroll-area"
    >
      <div className="z-[1] w-full px-6 py-8 lg:px-8 lg:pb-16 lg:pt-24">
        <div className="mx-auto w-full lg:mb-0 lg:max-w-3xl">
          <div className="mb-6 flex flex-col gap-6">
            <FileSearch size="60px" />
            <PageTitle title="Not found 404" className="font-semibold" />
          </div>
          <p>
            This link might be broken, deleted, or moved. Nevertheless, there’s
            nothing to see here...
          </p>
        </div>
      </div>
    </div>
  )
}
