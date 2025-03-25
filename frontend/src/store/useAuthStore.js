import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create()(
    persist(
        (set) => ({
            auth: null,
            addAuth: (data) => set({ auth: data }),
            deleteAuth: () => set({ auth: null }),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
