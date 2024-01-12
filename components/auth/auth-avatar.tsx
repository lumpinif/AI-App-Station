import { signOut } from "@/app/(auth)/actions"

import { Button } from "../ui/button"

const AuthAvatar = () => {
  return (
    <>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  )
}

export default AuthAvatar
