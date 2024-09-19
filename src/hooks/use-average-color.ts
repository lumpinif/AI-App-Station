import { useEffect, useMemo, useState } from "react"
import { FastAverageColor, FastAverageColorResult } from "fast-average-color"

const useAverageColor = (imageSrc: string, isBottom: boolean) => {
  const [color, setColor] = useState<{
    rgb: string
    rgba: string
    colorEnd: string
    isDark: boolean
  }>({ rgb: "", rgba: "", colorEnd: "", isDark: true })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fac = useMemo(() => new FastAverageColor(), [])

  useEffect(() => {
    if (!imageSrc) {
      setError("No image source provided")
      setIsLoading(false)
      return
    }

    const img = new Image()
    let isUnmounted = false

    const cleanUp = () => {
      img.onload = null
      img.onerror = null
    }

    const loadImage = () => {
      return new Promise<void>((resolve, reject) => {
        img.onload = () => {
          if (!isUnmounted) resolve()
        }
        img.onerror = (event) => {
          if (!isUnmounted) {
            const err = new Error("Failed to load image")
            // @ts-ignore: Event type is not properly recognized
            err.event = event
            reject(err)
          }
        }
        img.src = imageSrc
        img.crossOrigin = "anonymous"

        // Handle cases where the image is already cached
        if (img.complete) {
          resolve()
        }
      })
    }

    const processImage = async () => {
      try {
        await loadImage()

        if (isUnmounted) return

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
              }
            : {
                height: size,
                mode: "speed",
                algorithm: "dominant",
              }
        )

        if (!isUnmounted) {
          setColor({
            rgb: color.rgb,
            rgba: color.rgba,
            colorEnd: `${[...color.value.slice(0, 3)].join(",")}`,
            isDark: color.isDark,
          })
          setIsLoading(false)
          setError(null)
        }
      } catch (err) {
        if (!isUnmounted) {
          console.error("Error processing image:", err)
          let errorMessage = "Failed to process image"
          if (err instanceof Error) {
            errorMessage = err.message
            // @ts-ignore: Additional properties on error object
            if (err.event) {
              // @ts-ignore: Event properties
              errorMessage += ` (Status: ${err.event.target.status}, URL: ${err.event.target.src})`
            }
          }
          setError(errorMessage)
          setIsLoading(false)
        }
      }
    }

    const timeoutId = setTimeout(() => {
      if (!isUnmounted) {
        setError("Image load timed out")
        setIsLoading(false)
        cleanUp()
      }
    }, 10000) // 10 seconds timeout

    processImage()

    return () => {
      isUnmounted = true
      clearTimeout(timeoutId)
      cleanUp()
      fac.destroy()
    }
  }, [fac, imageSrc, isBottom])

  return { color, isLoading, error }
}

export default useAverageColor
