import { Profile } from "@/types/db_tables"
import { UserAvatar } from "@/components/auth/avatar/user-avatar"
import { ProfileForm } from "@/components/auth/profile/profile-form"

type UserProfileEditFormProps = {
  profile: Profile
  onFormSubmitted: () => void
}

export const UserProfileEditForm: React.FC<UserProfileEditFormProps> = ({
  profile,
  onFormSubmitted,
}) => {
  return (
    <section className="relative grid h-fit gap-4 p-4 sm:gap-6 sm:p-6 md:gap-8 md:p-8">
      <UserAvatar withAvatarUploader profile={profile} className="size-16" />
      <div className="text-muted-foreground">{profile.email}</div>
      <ProfileForm {...profile} onFormSubmitted={onFormSubmitted} />
    </section>
  )
}
