import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const userLogin = ref(null);
  const userLoginError = ref("");

  const logout = () => {
    localStorage.removeItem("setSession");
    userLogin.value = null;
    userLoginError.value = "";
  };

  const login = async (email, password) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }

      userLogin.value = body.data.user;
      userLoginError.value = "";
      localStorage.setItem(
        "setSession",
        JSON.stringify({ user: body.data.user, token: body.data.token })
      );

      return body;
    } catch (err) {
      userLogin.value = null;
      userLoginError.value = err.data?.message || err.message || err;
    }
  };

  return {
    login,
    logout,
    userLogin,
    userLoginError,
  };
});
