import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,

      // login: รับ (payload, token)
      login: (payload, token) => {
        console.log("Login Payload:", payload);

        // รองรับหลายรูปแบบของ API response
        let userProfile = null;

        // case: payload is axios response (common pattern)
        if (payload?.data?.data?.user) {
          userProfile = payload.data.data.user;
        } else if (payload?.data?.user) {
          userProfile = payload.data.user;
        } else if (payload?.user) {
          userProfile = payload.user;
        } else if (payload) {
          userProfile = payload;
        }

        // Normalize fields: ensure we have firstName/lastName/displayName if possible
        // Some APIs may return `name` or `fullName` instead of firstName/lastName
        const firstName =
          userProfile?.firstName ||
          (typeof userProfile?.name === "string" ? userProfile.name.split(" ")[0] : undefined) ||
          (typeof userProfile?.fullName === "string" ? userProfile.fullName.split(" ")[0] : undefined);

        const lastName =
          userProfile?.lastName ||
          (typeof userProfile?.name === "string" ? userProfile.name.split(" ").slice(1).join(" ") : undefined) ||
          (typeof userProfile?.fullName === "string" ? userProfile.fullName.split(" ").slice(1).join(" ") : undefined);

        const role = userProfile?.role || userProfile?.roles || null;

        const normalizedUser = {
          ...userProfile,
          firstName: userProfile?.firstName || firstName,
          lastName: userProfile?.lastName || lastName,
          displayName: userProfile?.displayName || userProfile?.name || userProfile?.fullName || `${firstName || ""} ${lastName || ""}`.trim(),
        };

        if (!normalizedUser.firstName && !normalizedUser.displayName) {
          console.warn("⚠️ Warning: user profile missing name fields", userProfile);
        }

        // set state
        set({
          user: normalizedUser,
          role: role,
          token: token || null,
          isAuthenticated: true,
        });

        // only set localStorage keys when values exist (avoid storing 'undefined')
        if (token) localStorage.setItem("token", token);
        if (role) localStorage.setItem("role", role);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, role: null });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
