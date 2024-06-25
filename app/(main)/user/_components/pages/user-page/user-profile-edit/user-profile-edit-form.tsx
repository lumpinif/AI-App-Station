import { Profiles } from "@/types/db_tables"
import { cn, getUserRoleName } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/auth/avatar/user-avatar"
import { ProfileForm } from "@/components/auth/profile/profile-form"

type UserProfileEditFormProps = {
  profile: Profiles
  className?: string
  onFormSubmitted: () => void
}

export const UserProfileEditForm: React.FC<UserProfileEditFormProps> = ({
  profile,
  className,
  onFormSubmitted,
}) => {
  const userRoleName = getUserRoleName(profile.profile_role?.role)

  return (
    <section
      className={cn(
        "relative grid h-fit gap-4 p-6 sm:gap-6 md:gap-8 md:p-8",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <UserAvatar withAvatarUploader profile={profile} className="size-16" />
        <div className="flex flex-col-reverse items-end justify-between gap-x-2 gap-y-2 text-muted-foreground">
          <span>{profile.email}</span>
          <Badge className="max-w-fit select-none text-nowrap">
            {userRoleName}
          </Badge>
        </div>
      </div>

      <ProfileForm {...profile} onFormSubmitted={onFormSubmitted} />
    </section>
  )
}
