import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegisterUserStore = defineStore("register", () => {
  const registeredUser = ref(null);
  const registereUserError = ref("");

  const signUpUser = async (name, email, password) => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${url}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, c_password: password }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }

      registeredUser.value = body.data.user;
      registereUserError.value = "";

      return body;
    } catch (err) {
      registeredUser.value = null;
      registereUserError.value = err.data?.message || err.message || err;
    }
  };

  return {
    registeredUser,
    registereUserError,
    signUpUser,
  };
});
