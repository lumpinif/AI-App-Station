import { signOut } from "@/app/(auth)/actions"

import { Button } from "../ui/button"

const SignOutButton = () => {
  return (
    <>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </>
  )
}

export default SignOutButton
