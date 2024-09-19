"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"

import { ScrollArea } from "@/components/ui/scroll-area"

type ActiveIosStyleCardProps = {
  activeCard: any
  setActiveCard: (card: any) => void
}

export const ActiveIosStyleCard: React.FC<ActiveIosStyleCardProps> = ({
  activeCard,
  setActiveCard,
}) => {
  const ref = useRef(null)
  useOnClickOutside(ref, () => setActiveCard(null))

  useEffect(() => {
    let originalOverflow = document.body.style.overflow
    let originalPaddingRight = document.body.style.paddingRight

    if (activeCard) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth
      originalOverflow = document.body.style.overflow
      originalPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [activeCard])

  return (
    <motion.div
      ref={ref}
      layoutId={`card-${activeCard.title}`}
      className="card card-active fixed inset-5 z-50 m-0 mx-auto flex max-h-svh max-w-sm cursor-pointer select-none flex-col overflow-x-hidden rounded-none bg-background outline-none md:inset-10 md:max-w-xl"
      style={{
        borderRadius: 10,
      }}
    >
      <ScrollArea className="h-full">
        <div className="card-inner relative h-[430px] md:h-[500px]">
          <motion.img
            layoutId={`image-${activeCard.title}`}
            src={activeCard.image}
            alt="image"
            style={{ borderRadius: 0, objectFit: "cover" }}
            className="pointer-events-none z-50 h-[430px] w-full max-w-sm object-cover md:h-full md:max-w-xl"
          />
          <motion.button
            layoutId={`close-button-${activeCard.title}`}
            aria-label="Close button"
            onClick={() => setActiveCard(null)}
            className="close-button absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[50%] bg-black/20 text-primary backdrop-blur-sm"
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
            className="card-content active-card-content absolute bottom-0 left-0 right-0"
          >
            <div className="card-text px-4 pb-3 pt-0">
              <motion.h2
                layoutId={`card-heading-${activeCard.title}`}
                layout
                className="mb-1 max-w-40 text-left text-[40px] font-extrabold uppercase leading-[0.9] text-primary"
              >
                Game of the day
              </motion.h2>
            </div>
            <motion.div
              layoutId={`card-extra-info-${activeCard.title}`}
              style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              className="extra-info relative flex w-full items-center gap-2 bg-black/20 px-4 py-3 backdrop-blur-[2px]"
            >
              <motion.img
                src={activeCard.logo}
                width={40}
                height={40}
                alt="play"
                layoutId={`card-game-image-${activeCard.title}`}
                className="rounded-[8px]" //TODO: 8px?
              />
              <div className="desc-wrapper flex flex-col items-start">
                <motion.span
                  layoutId={`card-game-title-${activeCard.title}`}
                  className="game-title text-[12px] font-semibold text-primary"
                >
                  {activeCard.title}
                </motion.span>
                <motion.span
                  layoutId={`card-game-subtitle-${activeCard.title}`}
                  className="game-subtitle text-[12px] text-[#c4c5cd]"
                >
                  {activeCard.description}
                </motion.span>
              </div>
              <motion.button
                layoutId={`card-button-${activeCard.title}`}
                layout
                className="get-button ml-auto rounded-full bg-white/30 px-4 py-1 text-sm font-semibold text-primary"
              >
                Get
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          layoutId={`card-long-description-${activeCard.title}`}
          className="long-description flex-1 p-4"
        >
          <p>
            <b>Are you ready?</b> {activeCard.longDescription}
          </p>
          <p>
            <b>The never ending adventure </b>
            In this game set in a fairy tale world, players embark on a quest
            through mystical lands filled with enchanting forests and towering
            mountains. Players can explore the world, build their own viking
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore at
            accusantium consequuntur veritatis, autem error totam, vel, omnis ex
            adipisci rerum voluptatem. Animi harum odio numquam quo, deserunt
            porro fugiat. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Fugiat, minima? Doloribus animi ratione molestias nulla eius
            repellat magni dolorem assumenda rerum possimus itaque obcaecati,
            quis reiciendis minus esse. Expedita, cum. Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Tempore at accusantium
            consequuntur veritatis, autem error totam, vel, omnis ex adipisci
            rerum voluptatem. Animi harum odio numquam quo, deserunt porro
            fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, minima? Doloribus animi ratione molestias nulla eius
            repellat magni dolorem assumenda rerum possimus itaque obcaecati,
            quis reiciendis minus esse. Expedita, cum.Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Tempore at accusantium
            consequuntur veritatis, autem error totam, vel, omnis ex adipisci
            rerum voluptatem. Animi harum odio numquam quo, deserunt porro
            fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, minima? Doloribus animi ratione molestias nulla eius
            repellat magni dolorem assumenda rerum possimus itaque obcaecati,
            quis reiciendis minus esse. Expedita, cum.s reiciendis minus esse.
            Expedita, cum.Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Tempore at accusantium consequuntur veritatis, autem error
            totam, vel, omnis ex adipisci rerum voluptatem. Animi harum odio
            numquam quo, deserunt porro fugiat. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugiat, minima? Doloribus animi
            ratione molestias nulla eius repellat magni dolorem assumenda rerum
            possimus itaque obcaecati, quis reiciendis minus esse. Expedita,
            cum. rerum voluptatem. Animi harum odio numquam quo, deserunt porro
            fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fugiat, minima? Doloribus animi ratione molestias nulla eius
            repellat magni dolorem assumenda rerum possimus itaque obcaecati,
            quis reiciendis minus esse. Expedita, cum.s reiciendis minus esse.
            Expedita, cum.Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Tempore at accusantium consequuntur veritatis, autem error
            totam, vel, omnis ex adipisci rerum voluptatem. Animi harum odio
            numquam quo, deserunt porro fugiat. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fugiat, minima? Doloribus animi
            ratione molestias nulla eius repellat magni dolorem assumenda rerum
            possimus itaque obcaecati, quis reiciendis minus esse. Expedita,
            cum.
          </p>
        </motion.div>
      </ScrollArea>
    </motion.div>
  )
}
