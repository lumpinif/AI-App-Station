"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"

import { cn } from "@/lib/utils"

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[]
  duration?: number
  className?: string
}) => {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation()
      }, duration)
  }, [isAnimating, duration, startAnimation])

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false)
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          type: "spring",
          stiffness: 110,
          damping: 15,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          scale: 1.5,
          filter: "blur(5px)",
          position: "absolute",
        }}
        className={cn(
          "relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100",
          className
        )}
        key={currentWord}
      >
        {currentWord.split("").map((char, charIndex) => (
          <React.Fragment key={char + charIndex}>
            <motion.span
              key={char + charIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: charIndex * 0.09,
                duration: 1.4,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </React.Fragment>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
