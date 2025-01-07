<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/userAuth";
import { storeToRefs } from "pinia";

const router = useRouter();

const { login, logout } = useAuthStore();
const { userLogin, userLoginError } = storeToRefs(useAuthStore());

const email = ref("");
const password = ref("");
const snackbar = ref({
  show: false,
  message: "",
  color: "",
});

onMounted(() => {
  const userInStorage = localStorage.getItem("setSession");
  if (userInStorage) {
    router.push("/catalog");
  } else {
    router.push("/");
  }
});

watch([userLogin, userLoginError], () => {
  if (userLogin.value) {
    showSnackbar("Login successful!", "success");
    router.push("/catalog");
  }
  if (userLoginError.value) {
    showSnackbar(userLoginError.value, "error");
    logout();
  }
});

const showSnackbar = (message, color) => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.show = true;
};
const onSubmit = () => {
  login(email.value, password.value);
};
const onRegisterNewUserClick = () => {
  router.push("/register");
};
</script>

<template>
  <v-app>
    <v-container
      class="d-flex justify-center align-center"
      style="height: 100vh"
    >
      <v-card class="pa-4" elevation="2" width="100%" max-width="400">
        <v-card-title class="text-h5 text-center">Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              outlined
              dense
            ></v-text-field>
            <div class="sign-up-user-btn-container">
              <span class="login-user-text" @click="onRegisterNewUserClick"
                >Register new user</span
              >
            </div>
            <v-btn class="mt-4" color="primary" block type="submit">
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        timeout="2000"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<style>
body {
  margin: 0;
  font-family: Roboto, sans-serif;
  background-color: #f5f5f5;
}
.sign-up-user-btn-container {
  text-align: right;
}
.login-user-text {
  user-select: none;
  color: blue;
  transition: all ease 0.2s;
}
.login-user-text:hover {
  cursor: pointer;
  font-weight: 500;
  text-shadow: 0px 0px 10px white;
}
</style>
