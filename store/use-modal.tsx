import { create } from "zustand";

type TModalStore = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const useModalStore = create<TModalStore>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
