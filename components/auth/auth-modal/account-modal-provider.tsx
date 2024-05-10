import { getUserData } from "@/server/auth"

import AccountModal from "./account-modal"

const AccountModalProvider = async () => {
  const {
    data: { user },
  } = await getUserData()

  return <AccountModal user={user} />
}

export default AccountModalProvider
