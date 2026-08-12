import { create } from "zustand";

// Global auth store.
// After a successful Firebase login/register, the serialized user payload
// gets hydrated into this store so the dashboard (or any component) can
// read it without re-hitting Firebase every time.
const useAuthStore = create((set) => ({
  user: null, // { uid, email, name }
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
