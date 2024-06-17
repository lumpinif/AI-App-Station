import TodayPageTitle from "./_components/today-page-title"
import { DailyApp } from "./app/_components/daily-app"
import { DailyPost } from "./daily-post/_components/daily-post"

const TodayPage = () => {
  return (
    <>
      <TodayPageTitle />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <DailyPost />
        <DailyApp />
        {/* <div className="">Story of Today</div> */}
        <div className="">New Stories</div>
        <div className="">New App</div>
        <div className="">Featured Apps</div>
        <div className="">Featured Stories</div>
      </div>
    </>
  )
}

export default TodayPage
