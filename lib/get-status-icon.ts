import {
  CircleIcon,
  EyeClosedIcon,
  FileTextIcon,
  LapTimerIcon,
} from "@radix-ui/react-icons"
import { EyeOff, FileClock, FileText, Rocket } from "lucide-react"

import { Apps } from "@/types/db_tables"

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the app.
 * @returns A React component representing the status icon.
 */

export function getStatusIcon(status: Apps["app_publish_status"]) {
  const statusIcons = {
    pending: FileClock,
    published: Rocket,
    draft: FileText,
    unpublished: EyeOff,
  }

  return statusIcons[status] || CircleIcon
}

export function getStatusColor(status: Apps["app_publish_status"]) {
  const statusColor = {
    draft: "text-muted-foreground",
    pending: "text-yellow-500",
    published: "text-green-600",
    unpublished: "text-red-600",
  }
  return statusColor[status]
}
