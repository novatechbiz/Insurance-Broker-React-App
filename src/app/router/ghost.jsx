import GhostGuard from "middleware/GhostGuard";

const ghostRoutes = {
  id: "ghost",
  Component: GhostGuard,
  children: [
    {
      path: "login",
      lazy: async () => ({
        Component: (await import("app/pages/Auth")).default,
      }),
    },
    {
      path: "forgot-password",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/ForgotPassword")).default,
      }),
    },
    {
      path: "check-email",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/CheckEmail")).default,
      }),
    },
    {
      path: "reset-password",
      lazy: async () => ({
        Component: (await import("app/pages/Auth/ResetPassword")).default,
      }),
    },
  ],
};

export { ghostRoutes };
