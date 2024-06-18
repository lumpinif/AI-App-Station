"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { DailyApp } from "@/types/db_tables"
import useAverageColor from "@/hooks/use-average-color"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { ActiveIosStyleDACard } from "./active-ios-style-da-card"
import { IosStyleDACard } from "./ios-style-da-card"

type IosStyleDailyAppCardProps = {
  dailyApp: DailyApp
  screenshotsPublicUrls?: string[]
}

export const IosStyleDailyAppCard: React.FC<IosStyleDailyAppCardProps> = ({
  dailyApp,
  screenshotsPublicUrls,
}) => {
  const [activeCard, setActiveCard] = useState<DailyApp | null>(null)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseImageURL = `${supabaseUrl}/storage/v1/object/public/apps/`
  const appIconSrc = supabaseImageURL + dailyApp.apps.app_icon_src

  const imageSrc = screenshotsPublicUrls
    ? screenshotsPublicUrls[0]
    : "/images/Feature-thumbnail.png"

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

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         borderRadius: 20,
  //       }}
  //       className="flex size-full h-[430px] animate-magic-fade-up items-center justify-center bg-card/50"
  //     >
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

  return (
    <div className="w-full">
      <IosStyleDACard
        color={color}
        dailyApp={dailyApp}
        appIconSrc={appIconSrc}
        card_thumbnail={imageSrc}
        setActiveCard={setActiveCard}
        app_card_title="App of the Day"
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
          <ActiveIosStyleDACard
            color={color}
            activeCard={activeCard}
            appIconSrc={appIconSrc}
            setActiveCard={setActiveCard}
            app_card_title="App of the Day"
            screenshotsPublicUrls={screenshotsPublicUrls}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
