import { getUserSession } from "@/server/auth"

import AccountModal from "./account-modal"

const AccountModalProvider = async () => {
  const {
    data: { session },
  } = await getUserSession()

  return <AccountModal session={session} />
}

export default AccountModalProvider
