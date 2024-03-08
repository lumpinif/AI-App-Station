import { getCurrentDateFormatted } from "@/lib/utils"
import { PageTitle } from "@/components/layout/page-title"

const TodayPageTitle = () => {
  const currentDate = getCurrentDateFormatted()
  return (
    <div>
      <PageTitle title="Today" href="/today" subtitle={currentDate} />
    </div>
  )
}

export default TodayPageTitle
