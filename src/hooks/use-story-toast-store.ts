// Purpose: Store for the toast that appears when the story editor is launching.

import { create } from "zustand"

type ToastStore = {
  toastId: string | number | undefined
  setToastId: (toastId: string | number | undefined) => void
}

const useNewStoryToastStore = create<ToastStore>((set) => ({
  toastId: undefined,
  setToastId: (toastId) => set({ toastId: toastId }),
}))

export default useNewStoryToastStore
