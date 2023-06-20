import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";

const AUTH_TOKEN_KEY = "auth_token";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const token = useStorage(AUTH_TOKEN_KEY, null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const isLoggedIn = computed(() => !!user.value);

    const register = async ({ name, email, password }) => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (data.success) {
          setToken(data.token);
          user.value = data.user;
        }

        return data;
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    };

    const login = async ({ email, password }) => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (data.success) {
          setToken(data.token);
          user.value = data.user;
        }

        return data;
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    };
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          updateUser(data.user); // Update the user object directly
        }

        return data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    };
    const updateUser = (updatedUser) => {
      user.value = updatedUser;
    };

    const logout = () => {
      token.value = null;
      user.value = null;
      router.push("/login");
    };

    const setToken = (tokenResponse) => {
      token.value = tokenResponse;
    };

    return {
      updateUser,
      user,
      token,
      isAuthenticated,
      isLoggedIn,
      login,
      register,
      getUser,
      logout,
      setToken,
    };
  },
  { persist: true }
);
