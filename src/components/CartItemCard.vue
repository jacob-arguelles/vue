<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";

const { products } = defineProps(["products"]);

const { updateProductStockInCart } = useCartStore();

const onAddStock = (product) => {
  updateProductStockInCart(product.id, product.quantity + 1);
};
</script>

<template>
  <div :key="product.id" v-for="product in products">
    <v-card class="product-card">
      <v-card-item class="product-card-body">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar class="ma-3" rounded="0" size="125">
            <v-img :src="product.image" />
          </v-avatar>
          <div class="card-product-body-right">
            <v-card-title class="product-title">
              {{ product.name }}
            </v-card-title>
            <v-card-subtitle> ${{ product.price }} </v-card-subtitle>
            <v-card-text>
              {{ product.description }}
            </v-card-text>
            <v-card-subtitle>
              Quantity: {{ product.quantity }}
              <v-btn
                @click="onAddStock(product)"
                color="success"
                width="10"
                size="small"
                rounded="xl"
              >
                add
              </v-btn>
              <v-btn color="red" width="10" size="small" rounded="xl">
                sub
              </v-btn>
            </v-card-subtitle>
            <v-card-actions> </v-card-actions>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  font-size: 0.9rem;
}

.product-title {
  font-size: 1rem;
  font-weight: bold;
}

.product-card-body {
  padding: 0 !important;
}
.card-product-body-right {
  width: 220px;
}
</style>
