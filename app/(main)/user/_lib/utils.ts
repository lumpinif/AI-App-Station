import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  FileTextIcon,
  LapTimerIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons"

import { App } from "@/types/db_tables"

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the app.
 * @returns A React component representing the status icon.
 */

export function getStatusIcon(status: App["app_publish_status"]) {
  const statusIcons = {
    pending: LapTimerIcon,
    published: CheckCircledIcon,
    draft: FileTextIcon,
    unpublished: CrossCircledIcon,
  }

  return statusIcons[status] || CircleIcon
}
