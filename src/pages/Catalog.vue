<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import AppBar from "../components/AppBar.vue";
import ProductCard from "../components/ProductCard.vue";
import SearchEmpty from "../components/SearchEmpty.vue";

const { getProductsList } = useProductsStore();
const { getProductsInCart } = useCartStore();
const { products, productsError, loadingProductsList } = storeToRefs(
  useProductsStore()
);
const { productsInCartError, productStockInCartUpdatedError } = storeToRefs(
  useCartStore()
);

const productsState = ref([]);
const snackbar = ref({
  show: false,
  message: "",
  color: "",
});

onMounted(() => {
  getProductsList();
  getProductsInCart();
});

watch(products, () => {
  productsState.value = products.value;
});
watch(
  [productsError, productsInCartError, productStockInCartUpdatedError],
  () => {
    const setSnackbarOptions = (message) => {
      snackbar.value.message = message;
      snackbar.value.color = "error";
      snackbar.value.show = true;
    };
    console.log(
      "productStockInCartUpdatedError.value",
      productStockInCartUpdatedError.value
    );
    if (productsError.value) {
      setSnackbarOptions(productsError.value);
    }
    if (productsInCartError.value) {
      setSnackbarOptions(productsInCartError.value);
    }
    if (productStockInCartUpdatedError.value) {
      setSnackbarOptions(productStockInCartUpdatedError.value);
    }
  },
  { immediate: true }
);
</script>

<template>
  <AppBar />
  <v-container class="product-catalog-container">
    <v-row v-if="!loadingProductsList && productsState.length">
      <v-col
        v-for="product in productsState"
        :key="product.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
      >
        <ProductCard :product="product" />
      </v-col>
    </v-row>
    <v-row v-else-if="loadingProductsList">
      <v-col
        v-for="(product, index) in [1, 2, 3]"
        :key="index"
        cols="12"
        xs="12"
        sm="6"
        md="4"
      >
        <v-container>
          <v-skeleton-loader type="image, article"></v-skeleton-loader>
        </v-container>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" xs="12">
        <SearchEmpty />
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style>
.product-catalog-container {
  margin-top: 4rem !important;
}
</style>
