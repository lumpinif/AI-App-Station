"use client"

import { Profile } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useAvatarUploader } from "@/hooks/use-avatar-uploader"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { AvatarUploader } from "./avatar-uploader"

type UserAvatarProps = {
  profile?: Profile
  onClick?: (e: any) => void
  onUpload?: (filePath: string) => void
  className?: string
  avatarClassName?: string
  withAvatarUploader?: boolean
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  profile,
  onClick,
  onUpload,
  className,
  avatarClassName,
  withAvatarUploader = false,
}) => {
  const { uploadAvatar, isUploading } = useAvatarUploader(
    profile as Profile,
    onUpload
  )

  return (
    <>
      {!withAvatarUploader ? (
        <Avatar
          className={cn(
            "flex items-center justify-center hover:cursor-pointer",
            className
          )}
          onClick={onClick}
        >
          {!profile?.avatar_url ? (
            <Icons.user
              className={cn(
                "h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
                avatarClassName
              )}
            />
          ) : (
            <AvatarImage
              src={`${profile.avatar_url}`}
              alt={`${profile.full_name || profile.user_name || "User"}`}
              className={cn(
                "animate-fade h-full w-full rounded-full object-cover",
                avatarClassName
              )}
            />
          )}
        </Avatar>
      ) : (
        <Avatar
          className={cn(
            "relative flex items-center justify-center hover:cursor-pointer",
            className,
            isUploading && "animate-pulse"
          )}
        >
          {!profile?.avatar_url ? (
            <Icons.user
              className={cn(
                "h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
                avatarClassName
              )}
            />
          ) : (
            <div className="relative flex items-center justify-center">
              <AvatarImage
                src={`${profile.avatar_url}`}
                alt={`${profile.full_name || profile.user_name || "User"}`}
                className={cn(
                  "animate-fade h-full w-full rounded-full object-cover",
                  avatarClassName
                )}
              />

              <AvatarUploader
                isUploading={isUploading}
                uploadAvatar={uploadAvatar}
              />

              {isUploading && <LoadingSpinner className="absolute" />}
            </div>
          )}
        </Avatar>
      )}
    </>
  )
}
