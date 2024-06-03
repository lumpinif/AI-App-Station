import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type StoryPublishPreviewProps = {
  postImagesWithUrls?: string[]
}

const previewImageContainer = cn(
  " h-96 w-full rounded-2xl border border-dashed shadow-sm dark:border-0 dark:shadow-outline sm:w-full"
)

export const PostPublishPreview: React.FC<StoryPublishPreviewProps> = ({
  postImagesWithUrls,
}) => {
  const [previewImage, setPreviewImage] = useState<string>(
    postImagesWithUrls?.[0] ?? ""
  )
  const [isShowSelector, setIsShowSelector] = useState(false)

  const noImage =
    !PostImageSelector ||
    PostImageSelector.length === 0 ||
    PostImageSelector === undefined

  const promptForUser = (
    <div
      className={cn(
        "flex items-center justify-center p-4",
        previewImageContainer
      )}
    >
      <p>
        Include a high-quality image in your story to make it more inviting to
        readers.
      </p>
    </div>
  )

  return (
    <>
      <div className="space-y-4">
        <div className="page-title-font text-2xl">Story Preview</div>
        {noImage ? (
          promptForUser
        ) : (
          <>
            {!isShowSelector ? (
              <PostPreviewImage
                previewImage={previewImage}
                setIsShowSelector={setIsShowSelector}
              />
            ) : (
              <PostImageSelector
                setPreviewImage={setPreviewImage}
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
    </>
  )
}

type PostPreviewImageProps = StoryPublishPreviewProps & {
  previewImage: string
  setIsShowSelector: (value: boolean) => void
}
const PostPreviewImage: React.FC<PostPreviewImageProps> = ({
  previewImage,
  setIsShowSelector,
}) => {
  const handleButtonClick = () => {
    setIsShowSelector(true)
  }

  return (
    <AspectRatio ratio={16 / 9} className="relative">
      <Image
        src={previewImage}
        layout="fill"
        alt="Story image"
        className={cn(
          "relative rounded-2xl object-cover shadow-sm transition-all duration-150 ease-out hover:cursor-pointer hover:shadow-md"
        )}
      />
      <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20">
        <Button
          size={"label"}
          variant={"ghost"}
          onClick={handleButtonClick}
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

type PostImageSelectorProps = StoryPublishPreviewProps & {
  setPreviewImage: (imageUrl: string) => void
  setIsShowSelector: (value: boolean) => void
}

const PostImageSelector: React.FC<PostImageSelectorProps> = ({
  setPreviewImage,
  setIsShowSelector,
  postImagesWithUrls,
}) => {
  const [selectedImage, setSelectedImage] = useState("")

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const handleCheckClick = () => {
    setPreviewImage(selectedImage)
    setIsShowSelector(false)
  }

  return (
    <ScrollArea className={cn("relative", previewImageContainer)}>
      <span className="flex w-full items-center justify-between px-4 pt-4">
        <span
          className={cn(
            selectedImage ? "text-blue-600" : "text-muted-foreground"
          )}
        >
          Choose the preview
        </span>
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
      <ul className={cn("grid grid-cols-3 gap-4 p-4 sm:gap-4")}>
        {postImagesWithUrls?.map((imageUrl, index) => (
          <li key={index}>
            <AspectRatio ratio={9 / 9}>
              <Image
                src={imageUrl}
                layout="fill"
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
