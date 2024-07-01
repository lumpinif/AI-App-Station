"use client"

import { FlagTriangleRight } from "lucide-react"

import { Report_type, TCommentWithProfile } from "@/types/db_tables"
import { cn } from "@/lib/utils"

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { ReportForm } from "./report-form"

type DialogProps = React.ComponentPropsWithoutRef<typeof Dialog>
type DialogTriggerProps = React.ComponentPropsWithoutRef<typeof DialogTrigger>

type ReportDialogProps = {
  className?: string
  reportType: Report_type
  triggerClassName?: string
  children?: React.ReactNode
  dialogProps?: DialogProps
  comment?: TCommentWithProfile
  dialogTriggerProps?: DialogTriggerProps
}

export const ReportDialog: React.FC<ReportDialogProps> = ({
  comment,
  children,
  className,
  reportType,
  dialogProps,
  triggerClassName,
  dialogTriggerProps,
}) => {
  return (
    <Dialog {...dialogProps}>
      <DialogTrigger
        className={cn(
          "flex w-full items-start justify-between",
          triggerClassName
        )}
        {...dialogTriggerProps}
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
            {reportType === "feedback"
              ? `Feedback`
              : `Reporting this ${reportType}`}
          </h2>
          <p className="text-muted-foreground">
            {reportType === "feedback"
              ? `This website is still in development. I'd love to hear your feedback on it so that it can be improved. It's highly appreciated.`
              : `Thanks for taking the time to fill out this report! It means a lot
            to us!`}
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
