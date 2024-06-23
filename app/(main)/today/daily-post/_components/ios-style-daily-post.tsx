"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

import { DailyPost } from "@/types/db_tables"
import { AverageColor } from "@/lib/get-average-color-on-server"

import { ActiveIosStyleDPCard } from "./active-ios-style-dp-card"
import { IosStyleDPCard } from "./ios-style-dp-card"

type IosStyleDailyPostCardProps = {
  dailyPost: DailyPost
  averageColor: AverageColor
}

export const IosStyleDailyPostCard: React.FC<IosStyleDailyPostCardProps> = ({
  dailyPost,
  averageColor,
}) => {
  const [activeCard, setActiveCard] = useState<DailyPost | null>(null)

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
      <LayoutGroup>
        <IosStyleDPCard
          color={averageColor}
          dailyPost={dailyPost}
          setActiveCard={setActiveCard}
          post_card_title="AI News of the Day"
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

              <ActiveIosStyleDPCard
                key="active-dp-card"
                color={averageColor}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
                post_card_title="AI News of the Day"
              />
            </>
          ) : null}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}
