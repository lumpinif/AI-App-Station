import { Profile } from "@/types/db_tables"

type UserBioProps = {
  user_bio?: Profile["user_bio"]
}

export const UserBio: React.FC<UserBioProps> = ({ user_bio }) => {
  if (user_bio)
    return (
      <div className="max-w-lg text-balance leading-relaxed">{user_bio}</div>
    )
}
