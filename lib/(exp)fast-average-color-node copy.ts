import {
  FastAverageColor,
  FastAverageColorOptions,
  FastAverageColorResult,
} from "fast-average-color"
import fetch from "node-fetch"
import sharp from "sharp"

const fac = new FastAverageColor()

const MIN_SIZE = 10
const MAX_SIZE = 100

type ColorSample = {
  rgb: string
  rgba: string
  colorValue: string
  isDark: boolean
}

type AverageColorResult = {
  bottom: ColorSample
  top: ColorSample
  left: ColorSample
  right: ColorSample
}

async function sampleColor(
  pipe: sharp.Sharp,
  options: FastAverageColorOptions,
  metadata: sharp.Metadata,
  position: "bottom" | "top" | "left" | "right"
): Promise<ColorSample> {
  const sampleSize = 50 // You can adjust this value
  let extractOptions: sharp.Region

  switch (position) {
    case "bottom":
      extractOptions = {
        left: 0,
        top: metadata.height! - sampleSize,
        width: metadata.width!,
        height: sampleSize,
      }
      break
    case "top":
      extractOptions = {
        left: 0,
        top: 0,
        width: metadata.width!,
        height: sampleSize,
      }
      break
    case "left":
      extractOptions = {
        left: 0,
        top: 0,
        width: sampleSize,
        height: metadata.height!,
      }
      break
    case "right":
      extractOptions = {
        left: metadata.width! - sampleSize,
        top: 0,
        width: sampleSize,
        height: metadata.height!,
      }
      break
  }

  const sampleBuffer = await pipe
    .clone()
    .extract(extractOptions)
    .ensureAlpha()
    .raw()
    .toBuffer()

  const pixelArray = new Uint8Array(sampleBuffer)

  const color = fac.prepareResult(fac.getColorFromArray4(pixelArray, options))
  const dominantColor = fac.prepareResult(
    fac.getColorFromArray4(pixelArray, { ...options, algorithm: "dominant" })
  )

  return {
    rgb: color.rgb,
    rgba: color.rgba,
    colorValue: color.value.slice(0, 3).join(","),
    isDark: dominantColor.isDark,
  }
}

export async function getAverageColor(
  resource: string | Buffer,
  options: FastAverageColorOptions = {}
): Promise<AverageColorResult> {
  let input = resource

  if (typeof resource === "string") {
    const base64 = resource.split(/^data:image\/.*?;base64,/)[1]

    if (base64) {
      input = Buffer.from(base64, "base64")
    } else if (resource.search(/^https?:\/\//) !== -1) {
      const response = await fetch(resource)
      const arrayBuffer = await response.arrayBuffer()
      input = Buffer.from(arrayBuffer)
    }
  }

  let pipe = sharp(input)

  const metadata = await pipe.metadata()

  if (!metadata.width || !metadata.height) {
    throw new Error("Invalid image dimensions")
  }

  const result: AverageColorResult = {
    bottom: await sampleColor(pipe, options, metadata, "bottom"),
    top: await sampleColor(pipe, options, metadata, "top"),
    left: await sampleColor(pipe, options, metadata, "left"),
    right: await sampleColor(pipe, options, metadata, "right"),
  }

  return result
}
