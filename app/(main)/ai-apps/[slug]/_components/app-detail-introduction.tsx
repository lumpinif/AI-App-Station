import { App } from "@/types/db_tables"

type AppDetailIntroductionProps = {
  data: App["introduction"]
}

export const AppDetailIntroduction: React.FC<
  AppDetailIntroductionProps
> = ({}) => {
  return (
    <>
      <div className="">
        <h3 className="text-lg font-bold">Description</h3>
        <p className="text-sm">
          Photos, videos, quotes, web pages, tweets, youtube video, podcasts –
          share anything from anywhere just on the go. One tool for all your
          story making needs.
        </p>
        <p className="mt-2 text-sm">
          Unlock a whole new experience of story making with an all-in-one tool
          for creators, bloggers, content and news makers.
        </p>
      </div>
    </>
  )
}
