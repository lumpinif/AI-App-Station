"use client"

import { DailyPost } from "@/types/db_tables"

import { IosStyleCardWithoutDrag } from "./ios-style-card-without-drag"

type DailyPostCardProps = {
  dailyPost: DailyPost
}

export const DailyPostCard: React.FC<DailyPostCardProps> = ({ dailyPost }) => {
  return (
    <>
      <IosStyleCardWithoutDrag dailyPost={dailyPost} />
    </>
  )
}
