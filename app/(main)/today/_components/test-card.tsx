"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"

type cardProps = {
  title: string
  subtitle: string
  description: string
  longDescription: string
  image: string
  logo: string
}

type TestCardProps = {
  card: cardProps
  setActiveCard: (card: cardProps) => void
}

export const Card: React.FC<TestCardProps> = ({ card, setActiveCard }) => {
  return (
    <motion.div
      layoutId={`card-${card.title}`}
      className="relative mx-auto h-[370px] w-[320px]  cursor-pointer select-none overflow-hidden rounded-[20px] outline-none"
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveCard(card)}
      style={{ borderRadius: 20 }}
    >
      <motion.img
        layoutId={`image-${card.title}`}
        src={card.image}
        alt="image"
        style={{ borderRadius: 20 }}
        className="pointer-events-none absolute inset-0"
      />
      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`close-button-${card.title}`}
        className="text-primary absolute right-4 top-4 flex size-8 items-center justify-center rounded-[50%] bg-black/20 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          height="20"
          width="20"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
      <motion.div
        layoutId={`card-content-${card.title}`}
        className="card-content absolute bottom-0 left-0 right-0"
      >
        <div className="card-text py-0 pl-3 pr-4">
          <motion.h2
            layoutId={`card-heading-${card.title}`}
            className="mb-[4px] max-w-[160px] text-left text-[40px] font-extrabold uppercase leading-[0.9] text-white"
          >
            Game of the day
          </motion.h2>
        </div>

        <motion.div
          layoutId={`card-extra-info-${card.title}`}
          className="relative flex w-full items-center space-x-2 bg-black/20 p-3 backdrop-blur-[2px]"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <motion.img
            src={card.logo}
            width={40}
            height={40}
            alt="play"
            layoutId={`card-game-image-${card.title}`}
            className="rounded-lg"
          />
          <div className="desc-wrapper flex flex-col items-start">
            <motion.span
              layoutId={`card-game-title-${card.title}`}
              className="text-[12px] font-semibold text-white"
            >
              {card.title}
            </motion.span>
            <motion.span
              layoutId={`card-game-subtitle-${card.title}`}
              className="text-muted-foreground text-[12px]"
            >
              {card.description}
            </motion.span>
          </div>
          <motion.button
            layoutId={`card-button-${card.title}`}
            className="ml-auto rounded-full bg-white/30 px-4 py-1 text-[14px] font-semibold text-white"
            style={{ marginLeft: "auto" }}
          >
            Get
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        layoutId={`card-long-description-${card.title}`}
        className="grow p-4"
        style={{ position: "absolute", top: "100%", opacity: 0 }}
      >
        <div>
          <p>
            <b>Are you ready?</b> {card.longDescription}
          </p>
          <p>
            <b>The never ending adventure</b>
            In this game set in a fairy tale world, players embark on a quest
            through mystical lands filled with enchanting forests and towering
            mountains.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

type ActiveCardProps = {
  activeCard: cardProps
  setActiveCard: (card: cardProps | null) => void
}

function ActiveCard({ activeCard, setActiveCard }: ActiveCardProps) {
  const ref = useRef(null)
  useOnClickOutside(ref, () => setActiveCard(null))

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${activeCard.title}`}
      className="absolute top-0 m-0 flex h-full w-[260px] cursor-pointer select-none flex-col rounded-none outline-none"
      style={{ borderRadius: 0 }}
    >
      <div className="relative h-[430px] w-[360px]">
        <motion.img
          layoutId={`image-${activeCard.title}`}
          src={activeCard.image}
          alt="image"
          className="pointer-events-none h-full w-full cursor-default"
          style={{ borderRadius: 0 }}
        />
        <motion.button
          layoutId={`close-button-${activeCard.title}`}
          className="absolute right-[16px] top-[16px] flex h-[32px] w-[32px] items-center justify-center rounded-[50%] bg-black/20 text-white backdrop-blur-sm"
          aria-label="Close button"
          onClick={() => setActiveCard(null)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            height="20"
            width="20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
        <motion.div
          layoutId={`card-content-${activeCard.title}`}
          className="card-content active-card-content absolute bottom-0 left-0 right-0 "
        >
          <div className="py-0 pl-[12px] pr-[16px]">
            <motion.h2
              layoutId={`card-heading-${activeCard.title}`}
              layout
              className="card-heading mb-[4px] max-w-[160px] text-left text-[40px] font-extrabold uppercase leading-[0.9] text-white"
            >
              Game of the day
            </motion.h2>
          </div>
          <motion.div
            layoutId={`card-extra-info-${activeCard.title}`}
            className="extra-info relative flex w-full items-center space-x-2 bg-black/20 p-3 backdrop-blur-[2px]"
            // style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <motion.img
              src={activeCard.logo}
              width={40}
              height={40}
              alt="play"
              layoutId={`card-game-image-${activeCard.title}`}
              className="rounded-lg"
            />
            <div className="desc-wrapper flex flex-col items-start">
              <motion.span
                layoutId={`card-game-title-${activeCard.title}`}
                className="game-title text-[12px] font-semibold text-white"
              >
                {activeCard.title}
              </motion.span>
              <motion.span
                layoutId={`card-game-subtitle-${activeCard.title}`}
                className="game-subtitle text-muted-foreground text-[12px]"
              >
                {activeCard.description}
              </motion.span>
            </div>
            <motion.button
              layoutId={`card-button-${activeCard.title}`}
              layout
              className="ml-auto rounded-full bg-white/30 px-4 py-1 text-[14px] font-semibold text-white"
              style={{ marginLeft: "auto" }}
            >
              Get
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        layoutId={`card-long-description-${activeCard.title}`}
        className="long-description grow p-4"
      >
        <p>
          <b>Are you ready?</b> {activeCard.longDescription}
        </p>
        <p>
          <b>The never ending adventure </b>
          In this game set in a fairy tale world, players embark on a quest
          through mystical lands filled with enchanting forests and towering
          mountains. Players can explore the world, build their own viking
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function StyledWithoutDrag() {
  const [activeCard, setActiveCard] = useState(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCard(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="cards-wrapper relative flex h-[675px] w-full flex-col items-center justify-center border">
      {CARDS.map((card) => (
        <Card
          key={card.title}
          card={card}
          setActiveCard={setActiveCard as (card: cardProps | null) => void}
        />
      ))}
      <AnimatePresence>
        {activeCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay absolute inset-0 bg-black/50"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeCard ? (
          <ActiveCard
            activeCard={activeCard}
            setActiveCard={setActiveCard as (card: cardProps | null) => void}
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
]
