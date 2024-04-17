import { App } from "@/types/db_tables"

type AppDetailIntroductionProps = {
  data: App["introduction"]
}

export const AppDetailIntroduction: React.FC<
  AppDetailIntroductionProps
> = ({}) => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold tracking-wide">Description</h1>
      <span>
        <p className="text-sm">
          Photos, videos, quotes, web pages, tweets, youtube video, podcasts –
          share anything from anywhere just on the go. One tool for all your
          story making needs.
        </p>
        <p className="mt-2 text-sm">
          Unlock a whole new experience of story making with an all-in-one tool
          for creators, bloggers, content and news makers.
        </p>
      </span>
    </div>
  )
}
