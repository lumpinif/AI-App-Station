import Link from "next/link"

import { Topics } from "@/types/db_tables"

type TopicsGridProps = {
  topics: Topics[]
}

export const TopicsGrid: React.FC<TopicsGridProps> = ({ topics }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-2 md:pr-4 lg:grid-cols-3 lg:gap-6 lg:pr-6">
        {topics?.map((topic, index) => (
          <Link
            href={`/stories/topics/${topic.topic_slug}`}
            key={index}
            className="w-fit transition-all duration-300 ease-out active:scale-[.98]"
          >
            <div className="flex items-center text-primary/90 transition-all duration-300 ease-out hover:text-primary">
              {/* <span className="flex size-14 flex-none items-center justify-center rounded-xl border p-4 shadow-md transition-all duration-300 ease-out hover:shadow-lg dark:border-border/50 dark:hover:shadow-outline">
                {topic.topic_icon_name ? (
                  <LucideIcon
                    name={topic.topic_icon_name as dynamicLucidIconProps}
                    className="size-8"
                  />
                ) : (
                  <BoxSelect className="size-8 text-muted-foreground" />
                )}
              </span> */}

              <div className="text-lg font-medium tracking-tight transition-all duration-300 ease-out lg:ml-4 lg:text-xl">
                {topic.topic_name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
