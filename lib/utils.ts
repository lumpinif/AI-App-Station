import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateFormatted(): string {
  const currentDate = new Date()
  const formattedDate = format(currentDate, "EEEE MMMM dd")
  return formattedDate
}

export function titleToSlug(title: string) {
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
