import Link from "next/link"

import { cn } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

import AccountModalTrigger from "../auth-modal/account-modal-trigger"

type NewUserCardProps = {
  avatarCN?: string
  className?: string
  isWithLink?: boolean
  profileNameCN?: string
  profileEmailCN?: string
  isTriggerModal?: boolean
  profileContainerCN?: string
  withAvartarUploader?: boolean
  display?: "user_name" | "email"
  accountModalTriggerCN?: string
}

export const UserCard: React.FC<NewUserCardProps> = ({
  avatarCN,
  className,
  profileNameCN,
  isTriggerModal,
  profileEmailCN,
  display = "email",
  isWithLink = true,
  profileContainerCN,
  accountModalTriggerCN,
  withAvartarUploader = false,
}) => {
  const { isFetching, data: profile } = useUserProfile()
  const closeAccountModal = useAccountModal((state) => state.closeModal)

  return (
    <>
      {isWithLink ? (
        <Link
          href="/user"
          className={cn("flex items-center overflow-hidden", className)}
          onClick={closeAccountModal}
          passHref
        >
          <AccountModalTrigger
            withAvartarUploader={withAvartarUploader}
            className={accountModalTriggerCN}
            avatarClassName={avatarCN}
            isFetching={isFetching}
            isTriggerModal={isTriggerModal}
          />
          <div className={cn("flex flex-1 flex-col", profileContainerCN)}>
            <span className={profileNameCN}>{profile?.full_name}</span>
            <span className={profileEmailCN}>
              {display === "email" ? (
                profile?.email
              ) : (
                <span>@{profile?.user_name}</span>
              )}
            </span>
          </div>
        </Link>
      ) : (
        <div
          onClick={closeAccountModal}
          className={cn("flex items-center overflow-hidden", className)}
        >
          <AccountModalTrigger
            withAvartarUploader={withAvartarUploader}
            className={accountModalTriggerCN}
            avatarClassName={avatarCN}
            isFetching={isFetching}
            isTriggerModal={isTriggerModal}
          />

          <div className={cn("flex flex-1 flex-col", profileContainerCN)}>
            <span className={profileNameCN}>{profile?.full_name}</span>
            <span className={profileEmailCN}>
              {display === "email" ? (
                profile?.email
              ) : (
                <span>@{profile?.user_name}</span>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
