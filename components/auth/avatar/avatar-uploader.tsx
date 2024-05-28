import { Camera } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type AvatarUploaderProps = {
  uploadAvatar: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  isUploading: boolean
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  uploadAvatar,
  isUploading,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <form>
            <label
              htmlFor="avatarUpload"
              className="absolute inset-0 inline-block h-full w-full cursor-pointer text-center text-xs opacity-0 outline-none"
            >
              Upload Avatar
            </label>
            <input
              className="hidden"
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={isUploading}
            />
          </form>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="dark:bg-foreground dark:text-background flex items-center gap-2"
        >
          <span>Upload Avatar</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
