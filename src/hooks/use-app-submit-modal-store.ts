import { create } from "zustand"

interface AppSubmitModalState {
  isAppSubmitModalOpen: boolean
  openAppSubmitModal: () => void
  closeAppSubmitModal: () => void
}

export const useAppSubmitModalStore = create<AppSubmitModalState>((set) => ({
  isAppSubmitModalOpen: false,
  openAppSubmitModal: () => set({ isAppSubmitModalOpen: true }),
  closeAppSubmitModal: () => set({ isAppSubmitModalOpen: false }),
}))
