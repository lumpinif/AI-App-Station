import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentDateFormatted(): string {
  const currentDate = new Date()
  const formattedDate = format(currentDate, "iiii, MMMM do")
  return formattedDate
}
