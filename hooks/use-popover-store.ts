import { create } from "zustand"

interface PopoverState {
  isPopoverOpen: boolean
  togglePopover: () => void
  closePopover: () => void
}

export const usePopoverStore = create<PopoverState>((set) => ({
  isPopoverOpen: false,
  togglePopover: () =>
    set((state) => ({ isPopoverOpen: !state.isPopoverOpen })),
  closePopover: () => set({ isPopoverOpen: false }),
}))
