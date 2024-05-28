import { Profiles } from "@/types/db_tables"
import { cn } from "@/lib/utils"
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
  return (
    <section
      className={cn(
        "relative grid h-fit gap-4 p-6 sm:gap-6 md:gap-8 md:p-8",
        className
      )}
    >
      <UserAvatar withAvatarUploader profile={profile} className="size-16" />
      <div className="text-muted-foreground">{profile.email}</div>
      <ProfileForm {...profile} onFormSubmitted={onFormSubmitted} />
    </section>
  )
}
