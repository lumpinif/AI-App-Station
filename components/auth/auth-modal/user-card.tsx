import Link from "next/link"

import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

import AccountModalTrigger from "./account-modal-trigger"

type NewUserCardProps = {
  className?: string
  avatarCN?: string
  accountModalTriggerCN?: string
  profileContainerCN?: string
  profileNameCN?: string
  profileEmailCN?: string
  isTriggerModal?: boolean
  isWithLink?: boolean
  withAvartarUploader?: boolean
  display?: "user_name" | "email"
}

export const UserCard: React.FC<NewUserCardProps> = ({
  className,
  avatarCN,
  accountModalTriggerCN,
  profileContainerCN,
  profileNameCN,
  profileEmailCN,
  isTriggerModal,
  isWithLink = true,
  withAvartarUploader = false,
  display = "email",
}) => {
  const { isFetching, data: profile } = useUser()
  const CloseModal = useAccountModal((state) => state.CloseModal)

  return (
    <>
      {isWithLink ? (
        <Link
          href="/user"
          className={cn("flex items-center overflow-hidden", className)}
          onClick={CloseModal}
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
          className={cn("flex items-center overflow-hidden", className)}
          onClick={CloseModal}
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
