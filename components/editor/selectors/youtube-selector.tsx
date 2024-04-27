import { useEffect, useRef } from "react"
import { Youtube } from "lucide-react"
import { useEditor } from "novel"
import { toast } from "sonner"

import { cn, isValidUrl, isValidYoutubeUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal"
import { EnhancedDrawerClose } from "@/components/shared/enhanced-drawer"

interface YoutubeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef?: React.RefObject<HTMLDivElement>
}

function getYoutubeUrlFromString(str: string) {
  if (isValidUrl(str)) {
    if (isValidYoutubeUrl(str)) {
      return str
    }
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      const url = new URL(`https://${str}`)
      if (isValidYoutubeUrl(url.toString())) {
        return url.toString()
      }
    }
  } catch (e) {
    return null
  }
  return null
}

export const YoutubeSelector = ({
  open,
  onOpenChange,
  triggerRef,
}: YoutubeSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const widthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  const { editor } = useEditor()

  // Autofocus on input by default
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  if (!editor) return null

  const addYoutubeVideo = () => {
    const url = getYoutubeUrlFromString(inputRef.current?.value || "")

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(widthRef.current?.value || "640", 10)),
        height: Math.max(180, parseInt(heightRef.current?.value || "480", 10)),
      })
      onOpenChange(false)
    } else {
      toast("Please enter a valid Youtube URL")
    }
  }

  return (
    <>
      {open ? (
        <ResponsiveModal open={open} onOpenChange={onOpenChange}>
          <ResponsiveModalTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="gap-2 rounded-none border-none"
            >
              <Youtube className="size-4" />
              <p className={cn("decoration-stone-400 underline-offset-4")}>
                Youtube
              </p>
            </Button>
          </ResponsiveModalTrigger>
          <ResponsiveModalContent className="w-full border-t bg-popover p-10 lg:max-w-md">
            <EnhancedDrawerClose
              title="Embed Youtube Video"
              className="lg:hidden"
            />
            <ResponsiveModalHeader className={cn("hidden h-fit lg:block")}>
              <ResponsiveModalTitle>
                <span>Embed Youtube Video</span>
              </ResponsiveModalTitle>
              <ResponsiveModalDescription>
                <p>
                  Paste Youtube video&apos;s Url below. You can also set up the
                  width and the height of the video.
                </p>
              </ResponsiveModalDescription>
            </ResponsiveModalHeader>
            <div className="mt-4 flex flex-col space-y-6">
              <input
                ref={inputRef}
                type="text"
                placeholder="Paste YouTube URL"
                className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
              />
              <div className="flex space-x-2">
                <input
                  ref={widthRef}
                  type="number"
                  min="320"
                  max="1024"
                  placeholder="Width"
                  defaultValue="640"
                  className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
                />
                <input
                  ref={heightRef}
                  type="number"
                  min="180"
                  max="720"
                  placeholder="Height"
                  defaultValue="480"
                  className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={addYoutubeVideo}>
                  Embed Video
                </Button>
              </div>
            </div>
          </ResponsiveModalContent>
        </ResponsiveModal>
      ) : (
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="gap-2 rounded-none border-none"
            >
              <Youtube className="size-4" />
              <p className={cn("decoration-stone-400 underline-offset-4")}>
                Youtube
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 p-4" sideOffset={10}>
            <div className="flex flex-col space-y-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Paste Youtube URL"
                className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
              />
              <div className="flex space-x-2">
                <input
                  ref={widthRef}
                  type="number"
                  min="320"
                  max="1024"
                  placeholder="Width"
                  defaultValue="640"
                  className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
                />
                <input
                  ref={heightRef}
                  type="number"
                  min="180"
                  max="720"
                  placeholder="Height"
                  defaultValue="480"
                  className="flex-1 rounded-md bg-background p-2 text-sm outline-none"
                />
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={addYoutubeVideo}>
                  Embed Video
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}
