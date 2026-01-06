import { TCurentUser } from "@/lib/helper/getCurrentUsers";
import { create } from "zustand";

interface UserState {
  user: TCurentUser | null;
  setUser: (user: TCurentUser | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
