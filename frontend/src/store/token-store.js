import { create } from "zustand";

export const useTokenStore = create((set) => ({
    token: localStorage.getItem("token") || "",
    setToken: (token) => set({ token }),
}));