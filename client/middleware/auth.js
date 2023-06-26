import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return navigateTo("/");
  }
});
