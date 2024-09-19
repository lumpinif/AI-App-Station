"use client"

import { useEffect } from "react"
import { toast } from "sonner"

import { Apps } from "@/types/db_tables"
import { useAppSubmitModalStore } from "@/hooks/use-app-submit-modal-store"
import useAppSubmitToastStore from "@/hooks/use-app-toast-store"
import { usePopoverStore } from "@/hooks/use-popover-store"
import { PageTitle } from "@/components/layout/page-title"

import { InfoPopover } from "./forms/info-popover"

type AppEditorPageTitleProps = {
  app_title: Apps["app_title"]
}

export const AppEditorPageTitle: React.FC<AppEditorPageTitleProps> = ({
  app_title,
}) => {
  const toastId = useAppSubmitToastStore((state) => state.toastId)
  const setToastId = useAppSubmitToastStore((state) => state.setToastId)
  const closeAppSubmitModal = useAppSubmitModalStore(
    (state) => state.closeAppSubmitModal
  )
  const closePopover = usePopoverStore((state) => state.closePopover)
  const isAppSubmitModalOpen = useAppSubmitModalStore(
    (state) => state.isAppSubmitModalOpen
  )

  useEffect(() => {
    // This code will run once the component is mounted
    if (toastId) {
      toast.success("The editor has been launched! 🎉", {
        id: toastId,
        duration: 3000,
        description: "Happy editing",
      })
    }

    if (isAppSubmitModalOpen) {
      closeAppSubmitModal()
      closePopover()
    }

    // Reset toastId after showing the toast
    setToastId(undefined)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastId]) // Empty dependency array means this effect runs once on mount and not on updates

  return (
    <div className="flex items-start gap-x-2">
      <PageTitle
        title={`Editing ${app_title}`}
        withBorder={false}
        className="text-2xl"
      />

      <InfoPopover align="start" isQuestionIcon={false} iconClassName="size-3">
        *Please carefully complete all information before publish the app to the
        public. Once published, you will be honored in the app detail.
      </InfoPopover>
    </div>
  )
}
