<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRegisterUserStore } from "@/stores/registerUser";

const router = useRouter();

const { signUpUser } = useRegisterUserStore();
const { registeredUser, registereUserError } = storeToRefs(
  useRegisterUserStore()
);

const name = ref("");
const email = ref("");
const password = ref("");
const snackbar = ref({
  show: false,
  message: "",
  color: "",
});

watch([registeredUser, registereUserError], () => {
  if (registeredUser.value) {
    showSnackbar("Sign up successful!", "success");
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
  if (registereUserError.value) {
    showSnackbar(registereUserError.value, "error");
  }
});

const onRegister = async () => {
  signUpUser(name.value, email.value, password.value);
};
const showSnackbar = (message, color) => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.show = true;
};
const onPreviousScreen = () => {
  router.push("/");
};
</script>

<template>
  <v-app>
    <v-container
      class="d-flex justify-center align-center"
      style="height: 100vh"
    >
      <v-card class="pa-4" elevation="2" max-width="600" width="100%">
        <v-card-title class="text-h5 text-center">Register</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onRegister">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              outlined
              dense
            />
            <v-text-field v-model="name" label="Name" required outlined dense />

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              outlined
              dense
            />
            <v-btn class="mt-4" color="primary" block type="submit">
              SignUp
            </v-btn>
            <v-btn
              class="mt-2"
              text
              block
              color="secondary"
              @click="onPreviousScreen"
            >
              Back
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        timeout="5000"
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
</style>
