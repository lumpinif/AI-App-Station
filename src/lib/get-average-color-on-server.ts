import { FastAverageColorResult } from "fast-average-color"

import { getAverageColor } from "./fast-average-color-node"

export type AverageColor = Partial<FastAverageColorResult> & {
  colorEnd?: string
}

export async function getAverageColorOnServer(
  imageSrc: string,
  isBottom?: boolean
) {
  if (!imageSrc)
    return {
      rgb: "rgb(0, 0, 0)",
      rgba: "rgba(0, 0, 0, 0)",
      colorEnd: "0,0,0",
      isDark: true,
    }
  try {
    return await getAverageColor(imageSrc, {}, isBottom)
  } catch (error) {
    console.error("Error in getAverageColorOnServer:", error)
    return {
      rgb: "rgb(0, 0, 0)",
      rgba: "rgba(0, 0, 0, 0)",
      colorEnd: "0,0,0",
      isDark: true,
    }
  }
}
