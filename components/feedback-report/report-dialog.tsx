import { FlagTriangleRight } from "lucide-react"

import { Report_type, TCommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ReportForm } from "./report-form"

type ReportDialogProps = {
  className?: string
  reportType: Report_type
  triggerClassName?: string
  children?: React.ReactNode
  comment?: TCommentWithProfile
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  comment,
  children,
  className,
  reportType,
  triggerClassName,
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex w-full items-start justify-between",
          triggerClassName
        )}
      >
        {children ? (
          children
        ) : (
          <>
            Report
            <FlagTriangleRight className="size-4" aria-hidden="true" />
          </>
        )}
      </DialogTrigger>
      <DialogContent className="flex max-w-sm flex-col gap-y-6 rounded-2xl dark:shadow-outline sm:max-w-2xl sm:p-10 sm:px-14">
        <span>
          <h2 className="page-title-font text-2xl sm:text-3xl">
            Reporting this {reportType}
          </h2>
          <p className="text-muted-foreground">
            Thanks for taking the time to fill out this report! It means a lot
            to us!
          </p>
        </span>
        <ReportForm
          comment={comment}
          reportType={reportType}
          className={cn(className)}
        />
      </DialogContent>
    </Dialog>
  )
}
