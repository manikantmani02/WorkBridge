import { create } from "zustand";

export type UserRole = "worker" | "customer" | "admin";

interface AuthState {
  token?: string;
  role?: UserRole;
  phone?: string;
  setAuth: (payload: { token?: string; role?: UserRole; phone?: string }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  role: undefined,
  phone: undefined,
  setAuth: (payload) => set(() => ({ ...payload })),
  clear: () => set({ token: undefined, role: undefined, phone: undefined }),
}));
