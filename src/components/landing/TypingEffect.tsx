"use client"

import React, { useEffect, useRef, useState } from "react"

/**
 * Custom hook for creating a typing effect.
 *
 * @param text The text to be typed out.
 * @param duration The time interval between each letter or word.
 * @param isTypeByLetter If true, types out letter by letter; otherwise, word by word.
 * @returns The current state of the typing effect text.
 */

const useTypingEffect = (
  text: string,
  duration: number,
  isTypeByLetter: boolean = false
): string => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const items = isTypeByLetter ? text.split("") : text.split(" ")

  useEffect(() => {
    setCurrentPosition(0) // Resets the position when text changes.
  }, [text])

  useEffect(() => {
    if (currentPosition >= items.length) return // Stops when the end of the text is reached.

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1) // Increment position to type the next character or word.
    }, duration)

    return () => clearInterval(intervalId) // Cleanup interval on unmount or update.
  }, [currentPosition, items.length, duration])

  return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ") // Join typed items into a string.
}

// Texts array to display with the typing effect.
const texts: string[] = [
  "One Stop for all new AI solutions and trends",
  "Know. Empower. Evolve. Unlock your potential with AI",
  "Ultimate AI App Store. Beyond apps, beyond limits",
  "You can find cutting-edge AI solutions here",
  "Get ahead of the game. Join the AI revolution",
]

// Constants for animation timings.
const TIME_TO_FADE: number = 300
const TIME_INTERVAL: number = 3800
const TIME_PER_LETTER: number = 60

/**
 * Component to display texts with a typing effect and fade-out animation.
 */
export const TextTypingEffectWithTextsFadeOut: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0)
  const [fadeText, setFadeText] = useState(true)
  const [fadeCircle, setFadeCircle] = useState(true)
  const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false)

  const circleTimeout = useRef<NodeJS.Timeout | null>(null)
  const textTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Timer for the circle fade effect.
    circleTimeout.current = setTimeout(() => {
      setFadeCircle(false)
    }, texts[textIndex].split(" ").length * TIME_PER_LETTER + 1000)

    // Timer for the text fade effect.
    textTimeout.current = setTimeout(() => {
      setFadeText(false)
      setTimeout(() => {
        setTextIndex((prevIndex) =>
          prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
        )
        setFadeCircle(true)
        setFadeText(true)
      }, TIME_TO_FADE)
    }, TIME_INTERVAL)

    return () => {
      // Clear timeouts on unmount or before setting new timeouts.
      if (circleTimeout.current) clearTimeout(circleTimeout.current)
      if (textTimeout.current) clearTimeout(textTimeout.current)
    }
  }, [textIndex])

  return (
    <>
      <div
        className={`duration-400 typing-effect inline bg-gradient-to-r from-black to-gray-300 bg-clip-text leading-[1.2] text-transparent transition-all ease-out dark:from-white dark:to-zinc-600 ${
          fadeText ? "opacity-1 translate-y-0" : "opacity-0"
        }`}
        key={textIndex}
      >
        <span>
          {textToShow}
          <span
            className={`ml-2 inline-block h-3 w-3 rounded-full bg-zinc-800 duration-300 dark:bg-white ${
              fadeCircle ? "" : "scale-0"
            }`}
          />
        </span>
      </div>
    </>
  )
}
