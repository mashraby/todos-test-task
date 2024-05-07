import { create } from "zustand";

type TAlertStore = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export const useAlertStore = create<TAlertStore>((set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
}));
