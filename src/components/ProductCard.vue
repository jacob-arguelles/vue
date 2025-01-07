<script setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";

const { product } = defineProps(["product"]);
console.log("product", product.categories);
const { registerProductInCart } = useCartStore();
const { productInCart } = storeToRefs(useCartStore());

const addToCart = (product) => {
  registerProductInCart(product.id);
};

const btnAddDisabled = computed(() => {
  return productInCart.value.some((item) => item.product.id === product.id);
});
</script>

<template>
  <v-card class="product-catalog-card">
    <v-img
      src="https://via.placeholder.com/150"
      height="200px"
      class="card-img"
    />
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>${{ product.price }}</v-card-subtitle>
    <v-card-text class="card-text">
      {{ product.description }}
    </v-card-text>

    <div class="chips-container">
      <v-chip
        v-for="(category, index) in product.categories"
        :key="`${product.id}-${index}`"
        class="mx-2"
        color="primary"
        outlined
      >
        {{ category.name }}
      </v-chip>
    </div>

    <v-card-actions>
      <v-btn
        color="primary"
        :disabled="btnAddDisabled"
        @click="addToCart(product)"
      >
        Añadir al carrito
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style>
.card-img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.product-catalog-card {
  height: 100%;
}
.card-text {
  height: 4rem;
}
.chips-container {
  padding-bottom: 2px;
  height: 3rem;
  width: 100%;
  scroll-behavior: smooth;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: #3f51b5 #2e2e2e;
}

.chips-container::-webkit-scrollbar {
  height: 8px;
}

.chips-container::-webkit-scrollbar-thumb {
  background-color: #3f51b5;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.chips-container::-webkit-scrollbar-thumb:hover {
  background-color: #5c6bc0;
}

.chips-container::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  border-radius: 10px;
}

.chips-container {
}
</style>
