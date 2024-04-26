"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteScreenshot } from "@/server/data/supabase"
import { Uppy } from "@uppy/core"
import { Dashboard } from "@uppy/react"
import Tus from "@uppy/tus"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import { ImageIcon, Loader2, Plus, X } from "lucide-react"
import { toast } from "sonner"

import { App } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
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
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ResponsiveContentModal from "@/components/shared/responsive-content-modal"
import { AppDetailScreenshotsDialog } from "@/app/(main)/ai-apps/[slug]/_components/app-detail-screenshots-dialog"

type AppScreenshotsFormProps = {
  app_slug: App["app_slug"]
  app_submitted_by_user_id: App["submitted_by_user_id"]
  access_token: string
  screenshotsFileNames: string[]
  screenshotsPublicUrls: string[]
}

interface NetworkError extends Error {
  isNetworkError?: boolean
}

export const AppScreenshotsForm: React.FC<AppScreenshotsFormProps> = ({
  app_slug,
  app_submitted_by_user_id,
  access_token,
  screenshotsFileNames,
  screenshotsPublicUrls,
}) => {
  const router = useRouter()
  const { data: profile } = useUser()

  const allowedNumberOfImages = 6 - screenshotsPublicUrls.length

  const [isHovered, setIsHovered] = useState(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const [showUploadButton, setUploadButton] = useState<boolean>(false)

  const hasScreenshotsFileNames =
    screenshotsFileNames.length > 0 && screenshotsFileNames !== null

  const allowContinueUploading =
    hasScreenshotsFileNames && allowedNumberOfImages > 0

  const hasScreenshotsPublicUrls =
    screenshotsPublicUrls.length > 0 && screenshotsPublicUrls !== null

  const bucketNameApp = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_APP
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseUploadURL = `${supabaseUrl}/storage/v1/upload/resumable`

  const [uppy] = useState(() =>
    new Uppy({
      id: "screenshots-uploader",
      restrictions: {
        maxNumberOfFiles: allowedNumberOfImages,
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

  useEffect(() => {
    uppy.on("upload-error", (file, error: NetworkError, response) => {
      toast.error(`Failed to upload ${file?.name}. Please try again`)

      if (error?.isNetworkError) {
        toast.warning(
          "Network issues due to firewall or ISP issues. Please try again later."
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array means this effect runs once on mount and clean up on unmount

  uppy.on("file-added", async (file) => {
    setUploadButton(true)

    const supabaseMetadata = {
      bucketName: bucketNameApp,
      objectName:
        app_slug +
        "/" +
        app_submitted_by_user_id +
        "/" +
        "screenshots" +
        "/" +
        file.name,
      contentType: file.type,
    }

    file.meta = {
      ...file.meta,
      ...supabaseMetadata,
    }
  })

  uppy.on("upload", (data) => {
    // data object consists of `id` with upload ID and `fileIDs` array
    // with file IDs in current upload
    // data: { id, fileIDs }
    setIsUploading(true)
  })

  useEffect(() => {
    uppy.on("complete", (result) => {
      if (result.successful.length > 0) {
        toast.success("Screenshots updated")
        router.refresh()
      }
      router.refresh()
      setIsUploading(false)

      setShowUploadModal(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array means this effect runs once on mount and clean up on unmount

  uppy.on("file-removed", (file) => {
    if (uppy.getFiles().length === 0) {
      setUploadButton(false)
    }
  })

  const handleUpload = () => {
    if (uppy.getFiles().length !== 0) {
      setIsUploading(true)
      uppy.upload()
    } else {
      toast.warning("Please upload the Icon")
    }
  }

  const handleScreenshotDelete = async (screenshotFileName: string) => {
    const response = await deleteScreenshot(
      app_slug,
      app_submitted_by_user_id,
      screenshotFileName
    )

    if (response) {
      toast.success("Sreenshot deleted")
      router.refresh()
    } else {
      toast.error("Error deleting the sreenshot")
    }
  }

  return (
    <TooltipProvider>
      <section className="w-full flex-col space-y-4 sm:space-y-6">
        <span className="flex items-center space-x-2 md:space-x-4">
          <h1 className="w-fit text-lg font-semibold sm:text-2xl">
            Screenshots Gallary
          </h1>
          {allowContinueUploading && (
            <span className="flex items-center space-x-2">
              <span className="flex items-center space-x-2 text-sm text-muted-foreground">
                {allowedNumberOfImages} / 6
              </span>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      if (allowContinueUploading) {
                        setShowUploadModal(true)
                      }
                    }}
                    variant="ghost"
                    size={"xs"}
                    className="group"
                  >
                    <Plus className="h-4 w-4 text-muted-foreground opacity-50 transition-opacity duration-300 ease-out group-hover:text-foreground group-hover:opacity-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  className="flex items-center text-xs dark:bg-foreground dark:text-background"
                  align="center"
                  side="right"
                >
                  Add more screenshots
                </TooltipContent>
              </Tooltip>

              {isUploading && (
                <span className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                </span>
              )}
            </span>
          )}
        </span>

        <Tooltip delayDuration={0}>
          <div className="flex flex-col space-y-4">
            {!hasScreenshotsFileNames ? (
              <div className="relative mx-auto h-full w-full max-w-full">
                <TooltipTrigger asChild>
                  <ScreenshotsFormCarousel
                    setIsHovered={setIsHovered}
                    setShowUploadModal={setShowUploadModal}
                    isHovered={isHovered}
                  />
                </TooltipTrigger>
              </div>
            ) : (
              <ScreenshotsFormCarousel
                handleScreenshotDelete={handleScreenshotDelete}
                screenshotsFileNames={screenshotsFileNames}
                hasScreenshotsPublicUrls={hasScreenshotsPublicUrls}
                screenshotsPublicUrls={screenshotsPublicUrls}
                setIsHovered={setIsHovered}
                setShowUploadModal={setShowUploadModal}
                isHovered={isHovered}
              />
            )}

            <ResponsiveContentModal
              isOpen={showUploadModal}
              onChange={(open: boolean) => {
                if (!open) setShowUploadModal(false)
              }}
              drawerContentClassName="outline-none rounded-t-3xl"
              drawerHeight="h-fit"
              dialogContentClassName="w-full sm:max-w-xl md:max-w-3xl rounded-2xl shadow-outline sm:p-4"
              title="Upload Icon"
            >
              <div className="flex flex-col items-center space-y-6 p-4 pb-6 md:space-y-10">
                <Dashboard
                  uppy={uppy}
                  className="w-full"
                  disabled={
                    profile?.user_id !== app_submitted_by_user_id ||
                    isUploading ||
                    allowedNumberOfImages === 0
                  }
                  showSelectedFiles
                  showRemoveButtonAfterComplete
                  proudlyDisplayPoweredByUppy={false}
                  showLinkToFileUploadResult={false}
                  note={"Only Image files are allowed"}
                  hideUploadButton
                />
                {!showUploadButton && (
                  <span className="w-full text-center text-xs font-light text-muted-foreground/50 md:text-sm">
                    TODO: You can upload up to 6 images in total. Images only,
                    max 5MB each,
                  </span>
                )}
                {showUploadButton && (
                  <Button
                    disabled={
                      profile?.user_id !== app_submitted_by_user_id ||
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
          <TooltipContent
            className="flex items-center text-xs dark:bg-foreground dark:text-background"
            align="center"
            side="bottom"
            sideOffset={15}
          >
            Click to Upload Screenshots
          </TooltipContent>
        </Tooltip>
      </section>
    </TooltipProvider>
  )
}

type ScreenshotItem = {
  publicUrl: string
  fileName: string
}

type ScreenshotsFormCarouselProps = {
  isHovered: boolean
  setIsHovered: (isHovered: boolean) => void
  setShowUploadModal: (isHovered: boolean) => void
  hasScreenshotsPublicUrls?: boolean
  screenshotsPublicUrls?: string[]
  screenshotsFileNames?: string[]
  handleScreenshotDelete?: (screenshotFileName: string) => void
}

const ScreenshotsFormCarousel = ({
  isHovered,
  setIsHovered,
  setShowUploadModal,
  screenshotsFileNames,
  screenshotsPublicUrls,
  handleScreenshotDelete,
  hasScreenshotsPublicUrls,
}: ScreenshotsFormCarouselProps) => {
  const screenshotItems: ScreenshotItem[] | string[] | undefined =
    screenshotsPublicUrls &&
    screenshotsFileNames &&
    screenshotsPublicUrls.length === screenshotsFileNames.length
      ? screenshotsPublicUrls.map((publicUrl, index) => ({
          publicUrl,
          fileName: screenshotsFileNames[index],
        }))
      : screenshotsPublicUrls
  return (
    <Carousel
      opts={{
        align: "start",
        duration: 25,
        dragThreshold: 5,
      }}
      plugins={[WheelGesturesPlugin({})]}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CarouselContent className="mr-6 h-fit">
        {!hasScreenshotsPublicUrls
          ? Array.from({ length: 6 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="bg-transparent md:basis-1/2 lg:basis-1/3"
                onClick={() => setShowUploadModal(true)}
              >
                <AspectRatio ratio={16 / 9}>
                  <div className="relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                    <ImageIcon className="size-3/4 stroke-muted stroke-[1.5px] opacity-50 transition-opacity duration-300 ease-out group-hover:opacity-100 " />
                  </div>
                </AspectRatio>
              </CarouselItem>
            ))
          : screenshotItems &&
            screenshotItems.map((item, index) => (
              <CarouselItem
                key={index}
                className="bg-transparent md:basis-1/2 lg:basis-1/3"
              >
                <div className="group relative flex size-full items-center justify-center overflow-hidden rounded-2xl bg-card">
                  <AppDetailScreenshotsDialog
                    index={index}
                    screenshotsPublicUrls={screenshotsPublicUrls}
                    screenshot_url={
                      typeof item === "string" ? item : item.publicUrl
                    }
                  />
                  {typeof item !== "string" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="absolute right-1 top-1 z-50 rounded-full bg-muted/80">
                          <X className="transtition-all size-6 p-1 opacity-100 duration-200 ease-out group-hover:block group-hover:cursor-pointer group-hover:text-primary group-hover:opacity-100 dark:group-hover:text-primary md:hidden md:opacity-0" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-sm rounded-2xl md:max-w-md">
                        <AlertDialogHeader className="font-sans">
                          <AlertDialogTitle>
                            Are you sure you want to delete this screenshot?
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
                            onClick={() =>
                              handleScreenshotDelete!(item.fileName)
                            }
                            className="bg-destructive hover:bg-destructive/80"
                          >
                            <span className="text-primary">Confirm</span>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious
        hiddenOnCanNotScroll
        variant={"tag"}
        className={cn(
          "left-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-r",
          isHovered ? "" : "hidden"
        )}
      />
      <CarouselNext
        hiddenOnCanNotScroll
        variant={"tag"}
        className={cn(
          "right-0 size-10 h-full rounded-none from-background/80 to-transparent transition-colors duration-150 ease-out hover:bg-gradient-to-l",
          isHovered ? "" : "hidden"
        )}
      />
    </Carousel>
  )
}
