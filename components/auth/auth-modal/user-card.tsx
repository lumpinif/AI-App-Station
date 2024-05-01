import Link from "next/link"

import { cn } from "@/lib/utils"
import useUser from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"

import AccountModalTrigger from "./account-modal-trigger"

type NewUserCardProps = {
  className?: string
  avatarCN?: string
  modalTriggerCN?: string
  profileContainerCN?: string
  profileNameCN?: string
  profileEmailCN?: string
  isTriggerModal?: boolean
}

export const UserCard: React.FC<NewUserCardProps> = ({
  className,
  avatarCN: avatarCN,
  modalTriggerCN,
  profileContainerCN,
  profileNameCN,
  profileEmailCN,
  isTriggerModal,
}) => {
  const { isFetching, data: profile } = useUser()
  const CloseModal = useAccountModal((state) => state.CloseModal)

  return (
    <Link
      href="/user"
      className={cn("flex items-center overflow-hidden", className)}
      onClick={CloseModal}
      passHref
    >
      <AccountModalTrigger
        className={modalTriggerCN}
        avatarClassName={avatarCN}
        isFetching={isFetching}
        isTriggerModal={isTriggerModal}
      />
      <div className={cn("flex flex-1 flex-col", profileContainerCN)}>
        <span className={profileNameCN}>{profile?.full_name}</span>
        <span className={profileEmailCN}>{profile?.email}</span>
      </div>
    </Link>
  )
}
