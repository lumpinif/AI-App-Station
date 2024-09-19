"use client"

import { useState } from "react"

import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"

import { DPCard } from "./dp-card"
import { DPCardPreviewModal } from "./dp-card-preview-modal"

type DailyPostCardProps = {
  dailyPost: DailyPost
  averageColor: AverageColor
}

export const DailyPostCard: React.FC<DailyPostCardProps> = ({
  dailyPost,
  averageColor,
}) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)
  return (
    <div className="w-full">
      <DPCardPreviewModal
        dailyPost={dailyPost}
        averageColor={averageColor}
        isOpen={isPreviewModalOpen}
        onChange={setIsPreviewModalOpen}
      />

      <DPCard
        color={averageColor}
        dailyPost={dailyPost}
        post_card_title="AI News of the Day"
        onCardClick={() => setIsPreviewModalOpen(true)}
      />
    </div>
  )
}
