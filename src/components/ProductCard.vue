<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";

const { product } = defineProps(["product"]);

const { registerProductInCart } = useCartStore();

const addToCart = (product) => {
  registerProductInCart(product.id);
};
</script>

<template>
  <v-card>
    <v-img
      src="https://via.placeholder.com/150"
      height="200px"
      class="card-img"
    />
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>${{ product.price }}</v-card-subtitle>
    <v-card-text>
      {{ product.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="addToCart(product)">
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
</style>
