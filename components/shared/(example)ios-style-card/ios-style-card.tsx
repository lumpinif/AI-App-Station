"use client"

import { motion } from "framer-motion"

type IosStyleCardProps = {
  card: {
    title: string
    image: string
    logo: string
    description: string
    longDescription: string
  }
  setActiveCard: (card: any) => void
}

export const IosStyleCard: React.FC<IosStyleCardProps> = ({
  card,
  setActiveCard,
}) => {
  return (
    <motion.div
      layoutId={`card-${card.title}`}
      className="card relative mx-auto my-0 h-[430px] max-w-sm cursor-pointer select-none overflow-hidden rounded-xl bg-background outline-none md:max-w-md"
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveCard(card)}
      style={{ borderRadius: 20 }}
    >
      <motion.img
        layoutId={`image-${card.title}`}
        src={card.image}
        alt="image"
        style={{ borderRadius: 20 }}
      />
      <motion.button
        aria-hidden
        tabIndex={-1}
        layoutId={`close-button-${card.title}`}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
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
        <div className="card-text px-4 pb-3 pt-0">
          <motion.h2
            layoutId={`card-heading-${card.title}`}
            className="card-heading mb-1 max-w-40 text-left text-[40px] font-extrabold uppercase leading-[0.9] text-primary"
          >
            Game of the day
          </motion.h2>
        </div>
        <motion.div
          layoutId={`card-extra-info-${card.title}`}
          className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <motion.img
            src={card.logo}
            width={40}
            height={40}
            alt="play"
            layoutId={`card-game-image-${card.title}`}
            className="rounded-[8px]" //TODO: 8px?
          />
          <div className="desc-wrapper flex flex-col items-start">
            <motion.span
              layoutId={`card-game-title-${card.title}`}
              className="game-title text-[12px] font-semibold text-primary"
            >
              {card.title}
            </motion.span>
            <motion.span
              layoutId={`card-game-subtitle-${card.title}`}
              className="game-subtitle text-[12px] text-[#c4c5cd]"
            >
              {card.description}
            </motion.span>
          </div>
          <motion.button
            layoutId={`card-button-${card.title}`}
            className="get-button ml-auto rounded-full bg-white/30 px-4 py-1 text-sm font-semibold text-primary"
          >
            Get
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        layoutId={`card-long-description-${card.title}`}
        className="long-description flex-1 p-4"
        style={{ position: "absolute", top: "100%", opacity: 0 }}
      >
        <div>
          <p className="mb-4 text-[#666666]">
            <b className="font-semibold text-black">Are you ready?</b>{" "}
            {card.longDescription}
          </p>
          <p className="mb-4 text-[#666666]">
            <b className="font-semibold text-black">
              The never ending adventure
            </b>
            In this game set in a fairy tale world, players embark on a quest
            through mystical lands filled with enchanting forests and towering
            mountains.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
