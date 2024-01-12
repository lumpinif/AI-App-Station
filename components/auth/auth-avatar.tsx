import { signOut } from "@/utils/actions"

const AuthAvatar = () => {
  return (
    <form action={signOut}>
      <button type="submit">Sign Out</button>
    </form>
  )
}

export default AuthAvatar
