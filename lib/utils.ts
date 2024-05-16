import { clsx, type ClassValue } from "clsx"
import { format, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { USER_WEBSITE_MAX_LENGTH } from "@/config/profile-form-config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateFormatted(): string {
  const currentDate = new Date()
  const formattedDate = format(currentDate, "EEEE MMMM dd")
  return formattedDate
}

export function timeConverter(dateString: string): string {
  const isoString = dateString.replace(" ", "T")
  const date = parseISO(isoString)
  const formattedDate = format(date, "dd MMM yyyy")
  return formattedDate
}

export function nameToSlug(title: string) {
  // Detect if the title is URL-encoded
  let decodedTitle
  try {
    decodedTitle = decodeURIComponent(title)
  } catch (error) {
    // If decoding fails, assume it's not URL-encoded and use the original string
    decodedTitle = title
  }

  return decodedTitle
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function normalizeString(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function isValidYoutubeUrl(url: string): boolean {
  const ytRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
  return ytRegex.test(url)
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function getSiteUrl() {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_DEV_URL || "http://localhost:3000"
  } else {
    return process.env.NEXT_PUBLIC_PRO_URL || "https://aiappstation.com"
  }
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const websiteValidator = z
  .string()
  .max(USER_WEBSITE_MAX_LENGTH)
  .refine(
    (value) => {
      if (!value) return true // Allow empty string
      const urlPattern =
        /^(?:https?:\/\/)?(?:www\.)?[a-z0-9]+(?:\.[a-z0-9]+)*\.[a-z]{2,}$/i
      return urlPattern.test(value)
    },
    { message: "Please enter a valid URL." }
  )
  .transform((value) => {
    if (!value) return value
    return value.replace(/^(?!https?:\/\/)/, "https://")
  })
