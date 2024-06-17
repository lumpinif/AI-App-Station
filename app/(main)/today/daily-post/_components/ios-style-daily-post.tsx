"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { DailyPost } from "@/types/db_tables"
import useAverageColor from "@/hooks/use-average-color"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { ActiveIosStyleDPCard } from "./active-ios-style-dp-card"
import { IosStyleDPCard } from "./ios-style-dp-card"

type IosStyleDailyPostCardProps = {
  dailyPost: DailyPost
}

export const IosStyleDailyPostCard: React.FC<IosStyleDailyPostCardProps> = ({
  dailyPost,
}) => {
  const [activeCard, setActiveCard] = useState<DailyPost | null>(null)
  const imageSrc =
    dailyPost.posts.post_image_src || "/images/Feature-thumbnail.png"
  const { color, isLoading } = useAverageColor(imageSrc, true)

  useEffect(() => {
    function onKeyDown(event: { key: string }) {
      if (event.key === "Escape") {
        setActiveCard(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  if (isLoading) {
    return (
      <div
        style={{
          borderRadius: 20,
        }}
        className="flex size-full h-[430px] animate-magic-fade-in items-center justify-center bg-card/50"
      >
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="w-full">
      <IosStyleDPCard
        color={color}
        dailyPost={dailyPost}
        setActiveCard={setActiveCard}
        post_card_title="AI News of the Day"
      />

      <AnimatePresence>
        {activeCard ? (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/80"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeCard ? (
          <ActiveIosStyleDPCard
            color={color}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            post_card_title="AI News of the Day"
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
