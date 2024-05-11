import {
  Tooltip,
  TooltipContent,
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
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div>
          <label htmlFor="avatarUpload" className="sr-only">
            Upload Avatar
          </label>
          <input
            className="absolute inset-0 left-0 top-0 size-full cursor-pointer border-0 opacity-0 outline-none"
            type="file"
            id="avatarUpload"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={isUploading}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="right"
        className="dark:bg-foreground dark:text-background flex items-center gap-2"
      >
        <span>Upload Avatar</span>
      </TooltipContent>
    </Tooltip>
  )
}
