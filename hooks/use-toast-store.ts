import { create } from "zustand"

type ToastStore = {
  toastId: string | number | undefined
  setToastId: (toastId: string | number | undefined) => void
}

const useEditorLaunchingToastStore = create<ToastStore>((set) => ({
  toastId: undefined,
  setToastId: (toastId) => set({ toastId: toastId }),
}))

export default useEditorLaunchingToastStore
