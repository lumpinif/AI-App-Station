"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { ActiveIosStyleCard } from "./active-ios-style-card"
import { IosStyleCard } from "./ios-style-card"

type IosStyleCardWithoutDragProps = {}

export const IosStyleCardWithoutDrag: React.FC<
  IosStyleCardWithoutDragProps
> = ({}) => {
  const [activeCard, setActiveCard] = useState(null)

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
    <div className="mx-auto my-0 grid h-fit w-full gap-6 sm:grid-cols-2 md:grid-cols-3">
      {CARDS.map((card) => (
        <IosStyleCard
          key={card.title}
          card={card}
          setActiveCard={setActiveCard}
        />
      ))}
      <AnimatePresence>
        {activeCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeCard ? (
          <ActiveIosStyleCard
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const CARDS = [
  {
    title: "Vikings",
    subtitle: "Clash of the Norse Warriors",
    description: "A game about vikings",
    longDescription:
      "A game about vikings, where you can play as a viking and fight other vikings. You can also build your own viking village and explore the world.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game.webp",
    logo: "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game-logo.webp",
  },
  {
    title: "test 1",
    subtitle: "Clash of the Norse Warriors",
    description: "A game about vikings",
    longDescription:
      "A game about vikings, where you can play as a viking and fight other vikings. You can also build your own viking village and explore the world.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game.webp",
    logo: "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/app-store-like-cards/game-logo.webp",
  },
]
