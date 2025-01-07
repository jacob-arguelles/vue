<template>
  <div>
    <div style="text-align: center">
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Vaya!, No hay nada aca...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push("/");
  }, 3000);
});
</script>
