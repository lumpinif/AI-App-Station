"use client"

import { useState } from "react"

import { DailyApp, DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"

import { DACard } from "./da-card"
import { DACardPreviewModal } from "./da-card-preview-modal"

type DailyAppCardProps = {
  dailyApp: DailyApp
  averageColor: AverageColor
  screenshotsPublicUrls?: string[]
}

export const DailyAppCard: React.FC<DailyAppCardProps> = ({
  dailyApp,
  averageColor,
  screenshotsPublicUrls,
}) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false)

  return (
    <div className="w-full">
      <DACardPreviewModal
        dailyApp={dailyApp}
        averageColor={averageColor}
        isOpen={isPreviewModalOpen}
        onChange={setIsPreviewModalOpen}
        screenshotsPublicUrls={screenshotsPublicUrls}
      />

      <DACard
        color={averageColor}
        dailyApp={dailyApp}
        app_card_title="App of the Day"
        screenshotsPublicUrls={screenshotsPublicUrls}
        onCardClick={() => setIsPreviewModalOpen(true)}
      />
    </div>
  )
}
