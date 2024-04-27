import { clsx, type ClassValue } from "clsx"
import { format, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

import { Developer } from "@/types/db_tables"

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

function normalizeString(value: string): string {
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
