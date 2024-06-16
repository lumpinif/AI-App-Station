import TodayPageTitle from "./_components/today-page-title"
import { DailyPost } from "./daily-post/_components/daily-post"

const TodayPage = () => {
  return (
    <>
      <TodayPageTitle />

      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        <DailyPost />
        <div className="">App of The Today</div>
        <div className="">Post of Today</div>
        <div className="">New Post</div>
        <div className="">New App</div>
        <div className="">Featured Apps</div>
        <div className="">Featured Posts</div>
      </div>
    </>
  )
}

export default TodayPage
