import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAdmin: boolean;
  setAdmin: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      setAdmin: (status) => set({ isAdmin: status }),
    }),
    { name: "auth-storage" }
  )
);
