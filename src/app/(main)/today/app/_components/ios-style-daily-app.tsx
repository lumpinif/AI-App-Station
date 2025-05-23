"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { DailyApp } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"

import { ActiveIosStyleDACard } from "./active-ios-style-da-card"
import { IosStyleDACard } from "./ios-style-da-card"

type IosStyleDailyAppCardProps = {
  dailyApp: DailyApp
  averageColor: AverageColor
  screenshotsPublicUrls?: string[]
}

export const IosStyleDailyAppCard: React.FC<IosStyleDailyAppCardProps> = ({
  dailyApp,
  averageColor,
  screenshotsPublicUrls,
}) => {
  const [activeCard, setActiveCard] = useState<DailyApp | null>(null)

  const appIconSrc = dailyApp.apps.app_icon_src

  const imageSrc = screenshotsPublicUrls
    ? screenshotsPublicUrls[0]
    : "/images/Feature-thumbnail.png"

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        setActiveCard(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="w-full">
      <IosStyleDACard
        color={averageColor}
        dailyApp={dailyApp}
        appIconSrc={appIconSrc}
        card_thumbnail={imageSrc}
        setActiveCard={setActiveCard}
        app_card_title="App of the Day"
      />

      <AnimatePresence>
        {activeCard ? (
          <>
            <motion.div
              key="overlay"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black/80"
            />
            <ActiveIosStyleDACard
              key="active-da-card"
              color={averageColor}
              activeCard={activeCard}
              appIconSrc={appIconSrc}
              setActiveCard={setActiveCard}
              app_card_title="App of the Day"
              screenshotsPublicUrls={screenshotsPublicUrls}
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
