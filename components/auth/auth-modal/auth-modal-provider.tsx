import { getUserSession } from "@/app/(auth)/auth-actions"

import AuthModal from "./auth-modal"

const AuthModalProvider = async () => {
  const {
    data: { session },
  } = await getUserSession()

  return <AuthModal session={session} />
}

export default AuthModalProvider
