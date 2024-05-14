"use client"

import { Camera } from "lucide-react"

import { Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
import { useUserData } from "@/hooks/react-hooks/use-user"
import { useAvatarUploader } from "@/hooks/use-avatar-uploader"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons/icons"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

import { AvatarResetButton } from "./avatar-reset-button"
import { AvatarUploader } from "./avatar-uploader"

type UserAvatarProps = {
  profile?: Profiles
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
  const { uploadAvatar, isUploading, setIsUploading } = useAvatarUploader(
    profile as Profiles,
    onUpload
  )
  const { data: user } = useUserData()
  const isDefaultAvatar =
    !profile?.avatar_url ||
    profile?.avatar_url === "" ||
    user?.user_metadata.avatar_url === profile?.avatar_url

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
        <div className="flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <Avatar
            className={cn(
              "relative flex items-center justify-center hover:cursor-pointer",
              className,
              isUploading && "animate-pulse"
            )}
          >
            <div className="relative flex size-full cursor-pointer items-center justify-center">
              {!profile?.avatar_url ? (
                <>
                  <Icons.user
                    className={cn(
                      "h-[calc(75%)] w-[calc(75%)] rounded-full hover:cursor-pointer",
                      avatarClassName
                    )}
                  />
                  <span className="bg-background/20 absolute rounded-full p-2 backdrop-blur-[1px]">
                    <Camera className="size-6" />
                  </span>

                  <AvatarUploader
                    isUploading={isUploading}
                    uploadAvatar={uploadAvatar}
                  />

                  {isUploading && <LoadingSpinner className="absolute" />}
                </>
              ) : (
                <>
                  <AvatarImage
                    src={`${profile.avatar_url}`}
                    alt={`${profile.full_name || profile.user_name || "User"}`}
                    className={cn(
                      "animate-fade h-full w-full rounded-full object-cover",
                      avatarClassName
                    )}
                  />
                  <span className="bg-background/20 absolute rounded-full p-2 backdrop-blur-[1px]">
                    <Camera className="size-6" />
                  </span>

                  <AvatarUploader
                    isUploading={isUploading}
                    uploadAvatar={uploadAvatar}
                  />

                  {isUploading && <LoadingSpinner className="absolute" />}
                </>
              )}
            </div>
          </Avatar>
          {!isDefaultAvatar && (
            <AvatarResetButton
              setIsUploading={setIsUploading}
              profile={profile}
              isDefaultAvatar={isDefaultAvatar}
            />
          )}
        </div>
      )}
    </>
  )
}
