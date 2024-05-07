import { create } from "zustand";

type TStatusStore = {
  status: string;
  setStatus: (state: string) => void;
};

export const useStatusStore = create<TStatusStore>((set) => ({
  status: "",
  setStatus: (value) => set({ status: value }),
}));
