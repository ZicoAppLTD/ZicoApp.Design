import { create } from "zustand";

export type ModalType = "free_consultation_session";

interface ModalData {
  noteId?: string;
  link?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isModalOpen: boolean;
  onModalOpen: (type: ModalType, data?: ModalData) => void;
  onModalClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isModalOpen: false,
  onModalOpen: (type, data = {}) => set({ isModalOpen: true, type, data }),
  onModalClose: () => set({ type: null, isModalOpen: false }),
}));
