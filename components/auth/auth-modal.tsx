"use client"

import useAuthModal from "@/hooks/use-auth-modal-store"
import Modal from "@/components/shared/Modal"

import LoginCard from "./login-card"

const AuthModal = () => {
  // const [isMounted,setIsMounted]=useState(false);
  const isOpen = useAuthModal((state) => state.isOpen)
  const CloseModal = useAuthModal((state) => state.CloseModal)

  //  useEffect (()=>{ setIsMounted(true); },[])
  //  if (!isMounted) { return null; }

  const onChange = (open: boolean) => {
    if (!open) CloseModal()
  }

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <LoginCard />
    </Modal>
  )
}

export default AuthModal
