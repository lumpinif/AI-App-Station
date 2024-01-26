import { create } from "zustand"

type SearchDialogStore = {
  isOpen: boolean
  OpenSearchDialog: () => void
  CloseSearchDialog: () => void
  ToggleSearchDialog: () => void
}

const useSearchDialog = create<SearchDialogStore>((set) => ({
  isOpen: false,
  OpenSearchDialog: () => set({ isOpen: true }),
  CloseSearchDialog: () => set({ isOpen: false }),
  ToggleSearchDialog: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useSearchDialog
