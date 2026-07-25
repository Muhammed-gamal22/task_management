import { create } from "zustand";

export const useTaskStore = create((set) => ({
    isOpenTaskModal: false,
    isEdit: false,
    setIsTaskModalOpen: (isOpenTaskModal) => set({ isOpenTaskModal }),
    setIsEdit: (isEdit) => set({ isEdit }),
}));