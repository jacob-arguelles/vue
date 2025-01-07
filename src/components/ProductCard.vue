<script setup>
import { defineProps, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";

const { product } = defineProps(["product"]);

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
</style>
