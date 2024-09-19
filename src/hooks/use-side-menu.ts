import { create } from "zustand"

type SideMenuStore = {
  isOpen: boolean
  isPinned: boolean
  isHovered: boolean
  isFullyCollapsed: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  pinMenu: () => void
  unpinMenu: () => void
  togglePin: () => void
  setHovered: (hovered: boolean) => void
  setFullyCollapsed: (fullyCollapsed: boolean) => void
}

const useSideMenu = create<SideMenuStore>((set) => ({
  isOpen: true,
  isPinned: true,
  isHovered: false,
  isFullyCollapsed: false,

  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),

  pinMenu: () => set({ isPinned: true, isOpen: true, isFullyCollapsed: false }),
  unpinMenu: () => set({ isPinned: false }),
  togglePin: () =>
    set((state) => {
      const newIsPinned = !state.isPinned
      return {
        isPinned: newIsPinned,
        isOpen: newIsPinned || state.isHovered,
        isFullyCollapsed:
          !newIsPinned && !state.isHovered && state.isFullyCollapsed,
      }
    }),

  setHovered: (hovered: boolean) =>
    set((state) => ({
      isHovered: hovered,
      isOpen: state.isPinned || hovered || state.isOpen,
      isFullyCollapsed: !hovered && !state.isPinned && state.isFullyCollapsed,
    })),

  setFullyCollapsed: (fullyCollapsed: boolean) =>
    set((state) => ({
      isFullyCollapsed: fullyCollapsed && !state.isPinned,
      isOpen: state.isPinned || state.isHovered || !fullyCollapsed,
    })),
}))

export default useSideMenu
