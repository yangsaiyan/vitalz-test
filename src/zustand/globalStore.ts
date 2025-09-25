import { create } from "zustand";

interface GlobalStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
