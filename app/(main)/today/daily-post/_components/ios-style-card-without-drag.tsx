"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { DailyPost } from "@/types/db_tables"
import { getCurrentDateFormatted } from "@/lib/utils"
import useAverageColor from "@/hooks/use-average-color"

import { ActiveIosStyleCard } from "./active-ios-style-card"
import { IosStyleCard } from "./ios-style-card"

type IosStyleCardWithoutDragProps = {
  dailyPost: DailyPost
}

export const IosStyleCardWithoutDrag: React.FC<
  IosStyleCardWithoutDragProps
> = ({ dailyPost }) => {
  const [activeCard, setActiveCard] = useState<DailyPost | null>(null)
  const imageSrc =
    dailyPost.posts.post_image_src || "/images/Feature-thumbnail.png"
  const { color, isLoading } = useAverageColor(imageSrc, true)
  const currentDate = getCurrentDateFormatted()

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
      <IosStyleCard
        color={color}
        dailyPost={dailyPost}
        currentDate={currentDate}
        post_card_title="Editor's Daily AI Newsletter"
        setActiveCard={setActiveCard}
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
          <ActiveIosStyleCard
            color={color}
            activeCard={activeCard}
            currentDate={currentDate}
            post_card_title="Editor's Daily AI Newsletter"
            setActiveCard={setActiveCard}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
