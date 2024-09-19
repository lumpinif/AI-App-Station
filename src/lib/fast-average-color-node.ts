import { FastAverageColor, FastAverageColorOptions } from "fast-average-color"
import fetch from "node-fetch"
import sharp from "sharp"

import { AverageColor } from "./get-average-color-on-server"

const fac = new FastAverageColor()

const MIN_SIZE = 10
const MAX_SIZE = 100

function prepareSizeAndPosition(
  originalSize: { width: number; height: number },
  options: FastAverageColorOptions
) {
  const srcLeft = options.left ?? 0
  const srcTop = options.top ?? 0
  const srcWidth = options.width ?? originalSize.width
  const srcHeight = options.height ?? originalSize.height

  let destWidth = srcWidth
  let destHeight = srcHeight

  if (options.mode === "precision") {
    return {
      srcLeft,
      srcTop,
      srcWidth,
      srcHeight,
      destWidth,
      destHeight,
    }
  }

  let factor

  if (srcWidth > srcHeight) {
    factor = srcWidth / srcHeight
    destWidth = MAX_SIZE
    destHeight = Math.round(destWidth / factor)
  } else {
    factor = srcHeight / srcWidth
    destHeight = MAX_SIZE
    destWidth = Math.round(destHeight / factor)
  }

  if (
    destWidth > srcWidth ||
    destHeight > srcHeight ||
    destWidth < MIN_SIZE ||
    destHeight < MIN_SIZE
  ) {
    destWidth = srcWidth
    destHeight = srcHeight
  }

  return {
    srcLeft,
    srcTop,
    srcWidth,
    srcHeight,
    destWidth,
    destHeight,
  }
}

export async function getAverageColor(
  resource: string | Buffer,
  options: FastAverageColorOptions = {},
  isBottom: boolean = true
): Promise<AverageColor> {
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
    throw new Error("Unable to get image dimensions")
  }

  // const size = prepareSizeAndPosition(
  //   {
  //     width: metadata.width,
  //     height: metadata.height,
  //   },
  //   options
  // )

  const size = 50 // Matching the client-side size

  const left = 0
  const top = isBottom ? Math.max(0, metadata.height - size) : 0

  // const left = options.left ?? 0
  // const top = isBottom
  //   ? Math.max(0, metadata.height - size.srcHeight)
  //   : options.top ?? 0

  // pipe = pipe
  //   .extract({
  //     left,
  //     top,
  //     width: size.srcWidth,
  //     height: size.srcHeight,
  //   })
  //   .resize(size.destWidth, size.destHeight)

  pipe = pipe
    .extract({
      left,
      top,
      width: metadata.width,
      height: size,
    })
    .resize(metadata.width, size)

  const buffer = await pipe.ensureAlpha().raw().toBuffer()
  const pixelArray = new Uint8Array(buffer.buffer)

  const color = fac.prepareResult(
    fac.getColorFromArray4(pixelArray, {
      ...options,
      mode: "speed",
      algorithm: "dominant",
    })
  )

  return {
    rgb: color.rgb,
    rgba: color.rgba,
    colorEnd: color.value.slice(0, 3).join(","),
    isDark: color.isDark,
  }
}
