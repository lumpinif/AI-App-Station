import { create } from "zustand"

type SideNavStore = {
  isOpen: boolean
  OpenSideNav: () => void
  CloseSideNav: () => void
  ToggleSideNav: () => void
}

const useSideNav = create<SideNavStore>((set) => ({
  isOpen: false,
  OpenSideNav: () => set({ isOpen: true }),
  CloseSideNav: () => set({ isOpen: false }),
  ToggleSideNav: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useSideNav
