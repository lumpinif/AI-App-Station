import { create } from "zustand"

type SearchDialogStore = {
  isOpen: boolean
  openSearchDialog: () => void
  closeSearchDialog: () => void
  toggleSearchDialog: () => void
}

const useSearchDialogStore = create<SearchDialogStore>((set) => ({
  isOpen: false,
  openSearchDialog: () => set({ isOpen: true }),
  closeSearchDialog: () => set({ isOpen: false }),
  toggleSearchDialog: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useSearchDialogStore
