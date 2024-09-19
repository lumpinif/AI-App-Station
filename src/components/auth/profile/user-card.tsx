import Link from "next/link"
import { BadgeCheck } from "lucide-react"

import { checkIsSuperUser, cn, getProfileRoleName } from "@/lib/utils"
import useUserProfile from "@/hooks/react-hooks/use-user"
import useAccountModal from "@/hooks/use-account-modal-store"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  display?: "user_name" | "email" | "user_role"
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

  const userRole = profile?.profile_role?.role
  const isSuperUser = checkIsSuperUser(userRole)
  const userRoleName = getProfileRoleName(userRole)

  return (
    <TooltipProvider>
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
            <span className={cn("flex items-center gap-x-1", profileNameCN)}>
              {profile?.full_name ?? profile?.email}
              {isSuperUser && (
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeCheck className="size-4 fill-blue-600 stroke-background" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your account is {userRoleName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
            <span className={profileEmailCN}>
              {display === "email" ? (
                profile?.email
              ) : display === "user_role" ? (
                userRoleName
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
            <span className={cn("flex items-center gap-x-1", profileNameCN)}>
              {profile?.full_name ?? profile?.email}
              {isSuperUser && (
                <Tooltip>
                  <TooltipTrigger>
                    <BadgeCheck className="size-4 fill-blue-600 stroke-background" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your account is {userRoleName}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
            <span className={profileEmailCN}>
              {display === "email" ? (
                profile?.email
              ) : display === "user_role" ? (
                userRoleName
              ) : (
                <span>@{profile?.user_name}</span>
              )}
            </span>
          </div>
        </div>
      )}
    </TooltipProvider>
  )
}
