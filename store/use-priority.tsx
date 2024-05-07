import { create } from "zustand";

type TPriorityStore = {
  priority: string;
  setPriority: (state: string) => void;
};

export const usePriorityStore = create<TPriorityStore>((set) => ({
  priority: "",
  setPriority: (value) => set({ priority: value }),
}));
