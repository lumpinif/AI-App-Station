import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  OpenModal: () => void;
  CloseModal: () => void;
};

const useAuthModal = create<ModalStore>((set) => ({
  isOpen: false,
  OpenModal: () => set({ isOpen: true }),
  CloseModal: () => set({ isOpen: false }),
}));

export default useAuthModal;
