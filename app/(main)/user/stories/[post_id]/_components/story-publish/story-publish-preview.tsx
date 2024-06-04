import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Check, X } from "lucide-react"

import { Posts } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type StoryPublishPreviewProps = {
  disabled?: boolean
  postImagesWithUrls: string[]
  onChange?: (value: string) => void
  post_image_src: Posts["post_image_src"]
}

const previewImageContainer = cn(
  " h-96 w-full rounded-2xl border border-dashed shadow-sm dark:border-0 dark:shadow-outline sm:w-full"
)

export const PostPublishPreview: React.FC<StoryPublishPreviewProps> = ({
  disabled,
  onChange,
  post_image_src,
  postImagesWithUrls,
}) => {
  const defaultImage = post_image_src ?? postImagesWithUrls[0] ?? ""
  const [previewImage, setPreviewImage] = useState<string>(defaultImage)

  const [isShowSelector, setIsShowSelector] = useState(false)

  useEffect(() => {
    if (defaultImage !== "") {
      onChange?.(defaultImage)
    }
  }, [defaultImage, onChange])

  const noImage =
    !previewImage || defaultImage === "" || postImagesWithUrls.length === 0

  const promptForUser = (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        previewImageContainer
      )}
    >
      <p>
        Include high-quality images in your story to make it more inviting to
        readers.
      </p>
    </div>
  )

  return (
    <div className="flex h-full flex-col justify-between gap-y-4">
      <div className="space-y-4">
        <div className="page-title-font text-2xl">Story Preview</div>
        {noImage ? (
          promptForUser
        ) : (
          <>
            {!isShowSelector ? (
              <PostPreviewImage
                disabled={disabled}
                previewImage={previewImage}
                setIsShowSelector={setIsShowSelector}
              />
            ) : (
              <PostImageSelector
                onChange={onChange}
                setPreviewImage={setPreviewImage}
                currentPreviewImage={previewImage}
                setIsShowSelector={setIsShowSelector}
                postImagesWithUrls={postImagesWithUrls}
              />
            )}
          </>
        )}
      </div>

      <div className="text-muted-foreground">
        Note: Changes here will affect how your story appears in public places —
        not the contents of the story itself.
      </div>
    </div>
  )
}

type PostPreviewImageProps = {
  disabled?: boolean
  previewImage: string
  setIsShowSelector: (value: boolean) => void
}
const PostPreviewImage: React.FC<PostPreviewImageProps> = ({
  disabled,
  previewImage,
  setIsShowSelector,
}) => {
  const handleChangeClick = () => {
    setIsShowSelector(true)
  }

  return (
    <AspectRatio ratio={16 / 9} className="relative">
      <Image
        fill
        sizes="100%"
        alt="Story image"
        src={previewImage}
        className={cn(
          "relative rounded-2xl object-cover shadow-sm transition-all duration-150 ease-out hover:cursor-pointer hover:shadow-md"
        )}
      />
      <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20">
        <Button
          size={"label"}
          variant={"ghost"}
          disabled={disabled}
          onClick={handleChangeClick}
          className={cn(
            "dark:glass-card-background font-page-title z-40 w-fit rounded-full border-0 bg-background/70 px-4 shadow-lg drop-shadow-lg backdrop-blur-xl transition-all duration-150 ease-out hover:shadow-xl active:scale-[.98] dark:shadow-outline dark:hover:-translate-y-px dark:hover:scale-[.99]"
          )}
        >
          Change the preview
        </Button>
      </span>
    </AspectRatio>
  )
}

type PostImageSelectorProps = {
  postImagesWithUrls: string[]
  currentPreviewImage: string
  onChange?: (value: string) => void
  setPreviewImage: (imageUrl: string) => void
  setIsShowSelector: (value: boolean) => void
}

const PostImageSelector: React.FC<PostImageSelectorProps> = ({
  onChange,
  setPreviewImage,
  setIsShowSelector,
  postImagesWithUrls,
  currentPreviewImage,
}) => {
  const [selectedImage, setSelectedImage] = useState("")

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const handleCheckClick = useCallback(() => {
    setPreviewImage(selectedImage)
    onChange?.(selectedImage)
    setIsShowSelector(false)
  }, [setPreviewImage, selectedImage, onChange, setIsShowSelector])

  const handleCancleClick = useCallback(() => {
    setIsShowSelector(false)
  }, [setIsShowSelector])

  return (
    <ScrollArea className={cn("relative", previewImageContainer)}>
      <div className="flex w-full items-center justify-between px-4 pt-4">
        <span
          className={cn(
            selectedImage ? "text-blue-600" : "text-muted-foreground"
          )}
        >
          Choose the preview
        </span>
        <span className="flex items-center gap-x-2">
          <button
            type="button"
            onClick={handleCancleClick}
            className="active:scale-[.98]"
          >
            <X className={cn("size-4", "text-muted-foreground")} />
          </button>

          <button
            type="button"
            disabled={!selectedImage}
            onClick={handleCheckClick}
            className="active:scale-[.98]"
          >
            <Check
              className={cn(
                "size-4",
                selectedImage ? "text-blue-600" : "text-muted-foreground"
              )}
            />
          </button>
        </span>
      </div>
      <ul className={cn("grid grid-cols-3 gap-4 p-4 sm:gap-4")}>
        {postImagesWithUrls?.map((imageUrl, index) => (
          <li key={index}>
            <AspectRatio ratio={9 / 9}>
              <Image
                fill
                sizes="100%"
                src={imageUrl}
                alt="Story image"
                onClick={() => handleImageClick(imageUrl)}
                className={cn(
                  "rounded-2xl object-cover shadow-sm transition-all duration-150 ease-out hover:cursor-pointer hover:shadow-md active:scale-[.98]",
                  selectedImage === imageUrl
                    ? "shadow-lg outline outline-offset-4 outline-blue-600"
                    : ""
                )}
              />
            </AspectRatio>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
