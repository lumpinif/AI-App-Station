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
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(word)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, duration, startAnimation, isFirstRender])

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
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 40,
          damping: 15,
        }}
        exit={{
          opacity: 0,
          y: -20,
          x: 30,
          scale: 1.25,
          filter: "blur(5px)",
          position: "absolute",
        }}
        className={cn(
          "relative z-10 inline-block px-2 text-left text-primary",
          className
        )}
        // style={{ overflow: "hidden" }}
        key={currentWord}
      >
        {currentWord.split("").map((char, charIndex) => (
          <motion.span
            key={char + charIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: charIndex * 0.08,
              duration: 0.4,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
