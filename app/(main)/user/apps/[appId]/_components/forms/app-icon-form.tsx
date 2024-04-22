"use client"

import { useState } from "react"
import Image from "next/image"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"
import { Image as ImageIcon } from "lucide-react"

import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"

import Tus from "@uppy/tus"

import { App } from "@/types/db_tables"
import useUser from "@/hooks/react-hooks/use-user"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

type AppIconFormProps = {
  app_id: App["app_id"]
  app_title: App["app_title"]
  app_submitted_by_user_id: App["submitted_by_user_id"]
  access_token?: string
  appIconFileName?: string
  appIconPublicUrl?: string
}

export const AppIconForm: React.FC<AppIconFormProps> = ({
  app_id,
  app_title,
  app_submitted_by_user_id,
  access_token,
  appIconFileName,
  appIconPublicUrl,
}) => {
  const { data: profile } = useUser()
  const [showIconUpModal, setShowIconUpModal] = useState<boolean>(false)
  const [showUploadButton, setUploadButton] = useState<boolean>(false)

  const bucketNameApp = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseUploadURL = `${supabaseUrl}/storage/v1/upload/resumable`

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1024 * 1024,
      },
    }).use(Tus, {
      endpoint: supabaseUploadURL,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  )

  uppy.on("file-added", (file) => {
    setUploadButton(true)

    const supabaseMetadata = {
      bucketName: bucketNameApp,
      objectName:
        app_title +
        "/" +
        app_submitted_by_user_id +
        "/" +
        "icon" +
        "/" +
        file.name,
      contentType: file.type,
    }

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    }
  })

  uppy.on("file-removed", (file) => {
    setUploadButton(false)
  })

  const handleUpload = () => {
    uppy.upload()
  }

  const ImageElement = (
    <Image
      src={""}
      width={200}
      height={200}
      alt={"App Logo"}
      className="aspect-square rounded-xl"
      priority
    />
  )

  return (
    <TooltipProvider>
      <div className="flex aspect-square flex-none items-center justify-center overflow-hidden rounded-xl bg-card p-2 shadow-md transition-all duration-200 ease-out dark:shadow-outline">
        <Tooltip delayDuration={0}>
          {!appIconFileName ? (
            <TooltipTrigger asChild>
              <div
                className="group flex size-full flex-col items-center justify-center sm:hover:cursor-pointer"
                onClick={() => {
                  setShowIconUpModal(true)
                }}
              >
                <ImageIcon className="size-3/4 stroke-muted stroke-[1.5px] opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100 " />
                <div className="flex flex-col items-center text-center text-xs leading-6 text-muted-foreground">
                  <p className="text-xs leading-5 text-muted">
                    Upload App Icon
                  </p>
                </div>
              </div>
            </TooltipTrigger>
          ) : (
            ImageElement
          )}
          <TooltipContent
            className="flex items-center text-xs dark:bg-foreground dark:text-background"
            align="center"
            side="bottom"
            sideOffset={15}
          >
            Upload App Icon
          </TooltipContent>
        </Tooltip>
      </div>
      <div>
        <ResponsiveContentModal
          isOpen={showIconUpModal}
          onChange={(open: boolean) => {
            if (!open) setShowIconUpModal(false)
          }}
          drawerContentClassName="outline-none rounded-t-3xl"
          drawerHeight="h-fit"
          dialogContentClassName="w-full max-w-xl rounded-2xl shadow-outline sm:p-4"
          title="Upload Icon"
        >
          <div className="flex flex-col items-center space-y-6 p-4 pb-6 md:space-y-10">
            <Dashboard
              className="w-full"
              disabled={profile?.user_id !== app_submitted_by_user_id}
              showSelectedFiles
              uppy={uppy}
              proudlyDisplayPoweredByUppy={false}
              showLinkToFileUploadResult
              hideUploadButton
              disableInformer
            />
            {!showUploadButton && (
              <span className="w-full text-center text-xs font-light text-muted-foreground/50 md:text-sm">
                TODO: CHANGE THIS Images only, max 5MB each
              </span>
            )}
            {showUploadButton && (
              <Button onClick={handleUpload} className="w-full">
                Upload
              </Button>
            )}
          </div>
        </ResponsiveContentModal>
      </div>
    </TooltipProvider>
  )
}
