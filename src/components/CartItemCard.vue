<script setup>
import { defineProps } from "vue";
import { useCartStore } from "@/stores/cart";

const { products } = defineProps(["products"]);

const { updateProductStockInCart /* deleteProductInCart */ } = useCartStore();

const onAddStock = (item) => {
  updateProductStockInCart(item.id, Number(item.quantity) + 1);
};
const onSubtractStock = (item) => {
  if (Number(item.quantity) < 1) {
    /* 
    Este endpoint responde con un status code 500. Para simular que elimino el producto lo que voy a hacer es filtrar los productos sin stock.
    deleteProductInCart(item.id);
    */
  } else {
    updateProductStockInCart(item.id, Number(item.quantity) - 1);
  }
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
                +
              </v-btn>
              <v-btn
                @click="onSubtractStock(product)"
                color="red"
                width="10"
                size="small"
                rounded="xl"
              >
                -
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
