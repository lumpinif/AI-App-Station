import { InDevNotice } from "@/components/shared/in-dev-notice"

export default function ForYouPagePage() {
  return (
    <>
      <InDevNotice
        title="For You Page"
        className="mx-auto flex h-96 flex-col items-center justify-center gap-x-4 gap-y-6 text-balance py-20 text-center text-xl font-normal text-muted-foreground sm:flex-row"
      >
        <span>
          We are upgrading... The &quot;For You Page&quot; is currently in
          active development. Please check back later.
        </span>
      </InDevNotice>
    </>
  )
}
