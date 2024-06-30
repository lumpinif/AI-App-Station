"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"
import { Image as ImageIcon, Loader2, X } from "lucide-react"

import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"

import { useRouter } from "next/navigation"
import { deleteAppIcon } from "@/server/data/supabase-actions"
import { createSupabaseBrowserClient } from "@/utils/supabase/browser-client"
import Tus from "@uppy/tus"
import { toast } from "sonner"

import { Apps } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"

type AppIconFormProps = {
  access_token: string
  app_id: Apps["app_id"]
  appIconFileName: string
  appIconPublicUrl: string
  app_slug: Apps["app_slug"]
  app_submitted_by_user_id: Apps["submitted_by_user_id"]
}

export const AppIconForm: React.FC<AppIconFormProps> = ({
  app_id,
  app_slug,
  access_token,
  appIconFileName,
  appIconPublicUrl,
  app_submitted_by_user_id,
}) => {
  const { data: profile } = useUserProfile()
  const router = useRouter()
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const [showUploadButton, setUploadButton] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isRefreshingIcon, setIsRefreshingIcon] = useState<boolean>(false)
  const hasAppIconFileName = appIconFileName !== "" && appIconFileName !== null
  const hasAppIconUrl = appIconPublicUrl !== "" && appIconPublicUrl !== null
  const supabase = createSupabaseBrowserClient()
  const bucketNameApp =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP || "apps"
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseUploadURL = `${supabaseUrl}/storage/v1/upload/resumable`

  const [uppy] = useState(() =>
    new Uppy({
      id: "app-icon-uploader",
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

  uppy.on("file-added", async (file) => {
    setUploadButton(true)

    // TODO: ADD user name after user_id
    const supabaseMetadata = {
      bucketName: bucketNameApp,
      objectName:
        app_slug +
        "/" +
        app_id +
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

  uppy.on("upload", () => {
    setIsRefreshingIcon(!isRefreshingIcon)
  })

  useEffect(() => {
    uppy.on("complete", (result) => {
      setIsRefreshingIcon(!isRefreshingIcon)
      if (result.successful.length > 0) {
        toast.success("App Icon updated")
        router.refresh()
      } else {
        toast.error("Please try again uploading Icon")
      }
      router.refresh()
      setIsUploading(false)
      setIsRefreshingIcon(false)
      setShowUploadModal(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array means this effect runs once on mount and clean up on unmount

  uppy.on("file-removed", (file) => {
    setUploadButton(false)
  })

  const handleUpload = () => {
    if (uppy.getFiles().length !== 0) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseImageURL = `${supabaseUrl}/storage/v1/object/public/${bucketNameApp}/`

      const app_icon_src =
        app_slug +
        "/" +
        app_id +
        "/" +
        app_submitted_by_user_id +
        "/" +
        "icon" +
        "/" +
        uppy.getFiles()[0].name

      const appIconSrc = supabaseImageURL + app_icon_src

      setIsUploading(!isUploading)
      uppy.upload().then(async () => {
        const { error } = await supabase
          .from("apps")
          .update({ app_icon_src: appIconSrc })
          .eq("app_id", app_id)
          .eq("submitted_by_user_id", app_submitted_by_user_id)

        if (error) {
          toast.error("Error updating App Icon Src")
        }
      })
    } else {
      toast.warning("Please upload the Icon")
    }
  }

  const handleIconDelete = async () => {
    setIsRefreshingIcon(!isRefreshingIcon)
    const response = await deleteAppIcon(
      app_id,
      app_slug,
      appIconFileName,
      app_submitted_by_user_id
    )

    if (response) {
      setIsRefreshingIcon(false)
      toast.success("App Icon deleted")
      router.refresh()
    } else {
      setIsRefreshingIcon(false)
      toast.error("Error deleting App Icon")
    }
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex aspect-square flex-none items-center justify-center overflow-hidden rounded-xl shadow-md transition-all duration-200 ease-out dark:shadow-outline",
          hasAppIconFileName ? "dark:bg-primary" : "bg-card"
        )}
      >
        <Tooltip delayDuration={0}>
          {!hasAppIconFileName ? (
            <TooltipTrigger asChild>
              <div
                className="group flex size-full flex-col items-center justify-center sm:hover:cursor-pointer"
                onClick={() => {
                  setShowUploadModal(true)
                }}
              >
                {isRefreshingIcon ? (
                  <Skeleton className="size-full" />
                ) : (
                  <>
                    <ImageIcon className="size-3/4 stroke-muted stroke-[1.5px] p-1 opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                    <div className="flex flex-col items-center text-center text-xs text-muted-foreground">
                      <p className="select-none px-1 text-xs leading-5 text-muted">
                        Upload Icon
                      </p>
                    </div>
                  </>
                )}
              </div>
            </TooltipTrigger>
          ) : (
            <div className="group relative">
              {isRefreshingIcon ? (
                <Skeleton className="size-full" />
              ) : (
                <Image
                  src={
                    hasAppIconUrl && hasAppIconFileName
                      ? appIconPublicUrl
                      : "/images/image-not-found.png"
                  }
                  width={200}
                  height={200}
                  alt={"App Logo"}
                  className="aspect-square rounded-xl p-2"
                  priority
                />
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="absolute right-1 top-1">
                    <X className="transtition-all hidden size-4 opacity-0 duration-200 ease-out group-hover:block group-hover:cursor-pointer group-hover:text-popover-foreground group-hover:opacity-100 dark:group-hover:text-popover" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-sm rounded-2xl md:max-w-md">
                  <AlertDialogHeader className="font-sans">
                    <AlertDialogTitle>
                      Are you sure you want to delete this icon?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action can not be undone
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="font-sans">
                    <AlertDialogCancel className="border-0">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleIconDelete}
                      className="bg-destructive hover:bg-destructive/80"
                    >
                      <span className="text-primary">Confirm</span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
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
          isOpen={showUploadModal}
          onChange={(open: boolean) => {
            if (!open) setShowUploadModal(false)
          }}
          drawerContentClassName="outline-none rounded-t-3xl"
          drawerHeight="h-fit"
          dialogContentClassName="w-full max-w-xl rounded-2xl shadow-outline sm:p-4"
          title="Upload Icon"
        >
          <div className="flex flex-col items-center space-y-6 p-4 pb-6 md:space-y-10">
            <Dashboard
              className="w-full"
              disabled={
                profile?.user_id !== app_submitted_by_user_id ||
                isRefreshingIcon
              }
              showSelectedFiles
              uppy={uppy}
              showRemoveButtonAfterComplete
              proudlyDisplayPoweredByUppy={false}
              showLinkToFileUploadResult={false}
              note={"Only Image files are allowed. Max 5MB each."}
              hideUploadButton
            />
            {!showUploadButton && (
              <span className="w-full text-center text-xs font-light text-muted-foreground/50 md:text-sm">
                TODO: CHANGE THIS Images only, max 5MB each
              </span>
            )}
            {showUploadButton && (
              <Button
                disabled={
                  profile?.user_id !== app_submitted_by_user_id ||
                  isRefreshingIcon ||
                  isUploading
                }
                onClick={handleUpload}
                className="w-full"
              >
                {isUploading ? (
                  <span className="flex items-center font-normal text-muted-foreground">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    <span>Uploading</span>
                  </span>
                ) : (
                  <span>Upload</span>
                )}
              </Button>
            )}
          </div>
        </ResponsiveContentModal>
      </div>
    </TooltipProvider>
  )
}
