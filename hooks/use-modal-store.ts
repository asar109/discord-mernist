import { create } from "zustand";

export type Modaltype = "createServer";

interface ModalStore {
  type: Modaltype | null;
  isOpen: boolean;
  onOpen: (type: Modaltype) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ isOpen: false, type: null }),
}));
