// useAverageColor.ts
import { useEffect, useMemo, useState } from "react"
import { FastAverageColor, FastAverageColorResult } from "fast-average-color"

const useAverageColor = (imageSrc: string, isBottom: boolean) => {
  const [color, setColor] = useState<{
    rgb: string
    rgba: string
    colorEnd: string
    isDark: boolean
  }>({ rgb: "", rgba: "", colorEnd: "", isDark: false })
  const [isLoading, setIsLoading] = useState(true)

  const fac = useMemo(() => new FastAverageColor(), [])

  useEffect(() => {
    const img = new Image()
    img.src = imageSrc
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const height = img.naturalHeight
      const size = 50

      const color = fac.getColor(
        img,
        isBottom
          ? {
              mode: "speed",
              height: size,
              top: height - size,
              algorithm: "dominant",
              /*      ignoredColor: [
                [255, 255, 255, 255], // white
                [0, 0, 0, 255], // black
              ], */
            }
          : {
              height: size,
              mode: "speed",
              algorithm: "dominant",
              /*    ignoredColor: [
                [255, 255, 255, 255], // white
                [0, 0, 0, 255], // black
              ], */
            }
      )
      // const colorEnd = `rgba(${[...color.value.slice(0, 3), 0].join(",")})`

      const dominantColor = fac.getColor(img, {
        step: 1,
        left: 10,
        mode: "speed",
        // top: height - size,
        algorithm: "dominant",
      })

      setColor({
        rgb: color.rgb,
        rgba: color.rgba,
        colorEnd: `${[...color.value.slice(0, 3)].join(",")}`,
        isDark: dominantColor.isDark,
      })

      setIsLoading(false)

      img.onerror = () => {
        console.error("Failed to load image:", imageSrc)
      }
    }
  }, [fac, imageSrc, isBottom])

  return { color, isLoading }
}

export default useAverageColor
