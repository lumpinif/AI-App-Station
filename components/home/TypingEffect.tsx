"use client"

import { useEffect, useState } from "react"

const useTypingEffect = (
  text: string,
  duration: number,
  isTypeByLetter = false
) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const items = isTypeByLetter ? text.split("") : text.split(" ")

  useEffect(() => {
    setCurrentPosition(0)
  }, [text])

  useEffect(() => {
    if (currentPosition >= items.length) return

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1)
    }, duration)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentPosition, items, duration])

  return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ")
}

const texts = [
  "One Stop for all new AI solutions and trends",
  "Know. Empower. Evolve. Unlock your potential with AI",
  "Ultimate AI App Store. Beyond apps, beyond limits",
  "You can find cutting-edge AI solutions here",
  "Get ahead of the game. Join the AI revolution",
]

const TIME_TO_FADE = 300
const TIME_INTERVAL = 3800
const TIME_PER_LETTER = 60

export const TextTypingEffectWithTextsFadeOut = () => {
  const [textIndex, setTextIndex] = useState(0)
  const [fadeText, setFadeText] = useState(true)
  const [fadeCircle, setFadeCircle] = useState(true)
  const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false)

  const timeToTypeText = texts[textIndex].split(" ").length * TIME_PER_LETTER

  useEffect(() => {
    const circleTimeout = setTimeout(() => {
      setFadeCircle(false)
    }, timeToTypeText + 1000)

    const textTimeout = setTimeout(() => {
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
      clearTimeout(circleTimeout)
      clearTimeout(textTimeout)
    }
  }, [textIndex, timeToTypeText])

  return (
    <>
      <div
        className={`duration-400 inline bg-gradient-to-r from-black to-gray-300 bg-clip-text leading-[1.2] text-transparent transition-all ease-out dark:from-white dark:to-zinc-600  ${
          fadeText ? "opacity-1 translate-y-0" : "translate-y-2 opacity-0"
        }`}
        key={textIndex}
      >
        <span>
          {textToShow}
          <span
            className={`ml-2 inline-block h-3 w-3 rounded-full bg-zinc-800 duration-300  dark:bg-white ${
              fadeCircle ? "" : "scale-0"
            }`}
          />{" "}
        </span>
      </div>
    </>
  )
}
