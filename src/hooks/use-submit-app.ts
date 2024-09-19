import useUserProfile from "./react-hooks/use-user"
import useAccountModal from "./use-account-modal-store"
import { useAppSubmitModalStore } from "./use-app-submit-modal-store"

const useSubmitApp = () => {
  const openAccountModal = useAccountModal((state) => state.openModal)
  const openAppSubmitModal = useAppSubmitModalStore(
    (state) => state.openAppSubmitModal
  )

  const { data: profile } = useUserProfile()
  const isUserLogged = !!profile && profile.user_id && profile.user_name

  const handleAppSubmitButtonClick = () => {
    if (isUserLogged) {
      openAppSubmitModal()
    } else {
      openAccountModal()
    }
  }

  return { handleAppSubmitButtonClick }
}

export default useSubmitApp
