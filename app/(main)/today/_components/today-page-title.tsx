import { getCurrentDateFormatted } from "@/lib/utils"
import { PageTitle } from "@/components/layout/page-title"

const TodayPageTitle = () => {
  const currentDate = getCurrentDateFormatted()
  return (
    <>
      <PageTitle
        withBorder
        title="Today"
        href="/today"
        subtitle={currentDate}
      />
    </>
  )
}

export default TodayPageTitle
