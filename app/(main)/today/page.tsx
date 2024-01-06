"use client"

import useAuthModal from "@/hooks/use-auth-modal-store"
import { Button } from "@/components/ui/button"

const TodayPage = () => {
  const OpenModal = useAuthModal((state) => state.OpenModal)
  return (
    <>
      TodayPage
      <Button onClick={OpenModal}>Click to Open</Button>
    </>
  )
}

export default TodayPage
