<script setup>
import { ref, watch, onWatcherCleanup } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products";
import { useAuthStore } from "@/stores/userAuth";
import { useCartStore } from "@/stores/cart";
import CartItemCard from "./CartItemCard.vue";

const router = useRouter();

const { getProductsList } = useProductsStore();
const { logout } = useAuthStore();
const { userLogin } = storeToRefs(useAuthStore());
const { productInCart, productStockInCartUpdated, productInCartDeleted } =
  storeToRefs(useCartStore());

const menu = ref(false);
const openCart = ref(false);
const search = ref("");
const cartItems = ref([]);

watch(search, () => {
  let timer;
  if (search.value) {
    timer = setTimeout(() => {
      getProductsList(search.value);
    }, 500);
  } else {
    getProductsList();
  }
  onWatcherCleanup(() => {
    Boolean(timer) && clearTimeout(timer);
  });
});
watch(
  userLogin,
  () => {
    const tokenInStorage = JSON.parse(localStorage.getItem("setSession"));
    if (!userLogin.value && !tokenInStorage) {
      router.push("/");
    }
    if (tokenInStorage?.user && !userLogin.value) {
      userLogin.value = tokenInStorage.user;
    }
  },
  { immediate: true }
);
watch(productInCart, () => {
  if (productInCart.value?.length) {
    cartItems.value = productInCart.value.map((item) => {
      const product = {
        id: item.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        quantity: item.stock,
        image: "https://via.placeholder.com/60",
      };
      return product;
    });
  } else {
    productInCart.value = [];
  }
});
watch(productStockInCartUpdated, () => {
  if (productStockInCartUpdated.value) {
    console.log(
      "filter",
      cartItems.value.filter((item) => Number(item.stock) > 0)
    );
    cartItems.value = cartItems.value
      .filter((item) => Number(item.stock) > 0)
      .map((item) => {
        if (productStockInCartUpdated.value.id === item.id) {
          return { ...item, quantity: productStockInCartUpdated.value.stock };
        }
        return item;
      });
  }
});
watch(productInCartDeleted, () => {
  if (productInCartDeleted.value) {
    cartItems.value = cartItems.value.filter((item) => {
      item.id !== productInCartDeleted.id;
    });
  }
});

const onLogout = () => {
  logout();
};
const viewCart = () => {
  openCart.value = !openCart.value;
};
</script>

<template>
  <v-app-bar app color="primary" dark>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="onLogout">
          <v-list-item-title>Cerrar sesión</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="viewCart">
      <v-badge
        :content="productInCart.length"
        color="red"
        overlap
        class="cart-badge"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>

    <v-responsive
      class="mx-auto"
      :max-width="$vuetify.display.mobile ? '300px' : '400px'"
    >
      <v-text-field
        v-model="search"
        placeholder="Buscar productos"
        clearable
        outlined
        dense
        hide-details
        append-icon="mdi-magnify"
      />
    </v-responsive>
  </v-app-bar>

  <v-navigation-drawer
    v-model="openCart"
    :location="$vuetify.display.mobile ? 'top' : 'left'"
    temporary
    :width="$vuetify.display.mobile ? undefined : 400"
  >
    <CartItemCard :products="cartItems" />
  </v-navigation-drawer>
</template>

<style></style>
