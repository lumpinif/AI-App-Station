import { create } from "zustand"

type ModalStore = {
  isOpen: boolean
  OpenModal: () => void
  CloseModal: () => void
}

const useAccountModal = create<ModalStore>((set) => ({
  isOpen: false,
  OpenModal: () => set({ isOpen: true }),
  CloseModal: () => set({ isOpen: false }),
}))

export default useAccountModal
