<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/userAuth";
import { useCartStore } from "@/stores/cart";
import CartItemCard from "./CartItemCard.vue";
import SearchInput from "./SearchInput.vue";

const router = useRouter();

defineEmits(["update:search"]);

const { logout } = useAuthStore();
const { userLogin } = storeToRefs(useAuthStore());
const {
  productInCart,
  productStockInCartUpdated,
  productInCartRegistered,
  productInCartDeleted,
} = storeToRefs(useCartStore());

const menu = ref(false);
const openCart = ref(false);
const cartItems = ref([]);

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
    cartItems.value = productInCart.value
      .filter((item) => Number(item.stock) > 0)
      .map((item) => {
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
    cartItems.value = [];
  }
});
watch(productInCartRegistered, () => {
  if (productInCartRegistered.value) {
    cartItems.value = [
      ...cartItems.value,
      {
        id: productInCartRegistered.value.id,
        name: productInCartRegistered.value.product.name,
        description: productInCartRegistered.value.product.description,
        price: productInCartRegistered.value.product.price,
        quantity: productInCartRegistered.value.stock,
        image: "https://via.placeholder.com/60",
      },
    ];
  }
});
watch(productStockInCartUpdated, () => {
  if (productStockInCartUpdated.value) {
    cartItems.value = cartItems.value
      .map((item) => {
        if (productStockInCartUpdated.value.id === item.id) {
          return { ...item, quantity: productStockInCartUpdated.value.stock };
        }
        return item;
      })
      .filter((item) => {
        return Number(item.quantity) > 0;
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
          <v-list-item-title>Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="viewCart">
      <v-badge
        :content="cartItems.length"
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
      <SearchInput @update:search="$emit('update:search', $event)" />
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
