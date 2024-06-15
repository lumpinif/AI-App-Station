import { IosStyleCardWithoutDrag } from "../stories/_components/post-card/ios-style-card-without-drag"
import TodayPageTitle from "./_components/today-page-title"
import { DailyPost } from "./daily-post/_components/daily-post"

const TodayPage = () => {
  return (
    <>
      <section className="flex flex-col gap-y-4 sm:my-4 md:my-8 md:gap-y-6 lg:my-10 lg:gap-y-8">
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
        <IosStyleCardWithoutDrag />
      </section>
    </>
  )
}

export default TodayPage
