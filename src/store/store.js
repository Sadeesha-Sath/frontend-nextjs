import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: null,
    token: null,
    status: "idle",
    setUser: (user) => set({ user }),
    setTokn: (token) => set({ token }),
    logout: () => set({ user: null, token: null }),
}));