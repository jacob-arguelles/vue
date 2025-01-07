import { ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  // Products list state
  const productInCart = ref([]);
  const loadingProductsInCart = ref(false);
  const productsInCartError = ref("");
  // Update stock state
  const productStockInCartUpdated = ref(null);
  const productStockInCartUpdatedLoading = ref(false);
  const productStockInCartUpdatedError = ref("");
  // Register product in cart state
  const productInCartRegistered = ref(null);
  const productInCartRegisterLoading = ref(false);
  const productInCartRegisterError = ref("");
  // Delete product in cart state
  const productInCartDeleted = ref(null);
  const productInCartDeleteLoading = ref(false);
  const productInCartDeleteError = ref("");

  const getProductsInCart = async () => {
    try {
      loadingProductsInCart.value = true;
      const url = import.meta.env.VITE_API_BASE_URL;
      const token = JSON.parse(localStorage.getItem("setSession"))?.token;
      const response = await fetch(`${url}/carts?per_page=100`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }
      productInCart.value = body.data;
      loadingProductsInCart.value = false;
    } catch (err) {
      loadingProductsInCart.value = false;
      productInCart.value = null;
      productsInCartError.value = err.data?.message || err.message || err;
    }
  };

  const updateProductStockInCart = async (itemId, newStock) => {
    try {
      productStockInCartUpdatedLoading.value = true;

      const token = JSON.parse(localStorage.getItem("setSession"))?.token;
      const url = import.meta.env.VITE_API_BASE_URL;
      const bodyToRequest = new URLSearchParams({ stock: `${newStock}` });

      const response = await fetch(`${url}/carts/${itemId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyToRequest.toString(),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }

      productStockInCartUpdated.value = body.data;
      productStockInCartUpdatedLoading.value = false;
    } catch (err) {
      productStockInCartUpdated.value = null;
      productStockInCartUpdatedError.value =
        err.data?.message || err.message || err;
      productStockInCartUpdatedLoading.value = false;
    }
  };

  const registerProductInCart = async (productid) => {
    try {
      productStockInCartUpdatedLoading.value = true;

      const url = import.meta.env.VITE_API_BASE_URL;
      const token = JSON.parse(localStorage.getItem("setSession"))?.token;
      const bodyToRequest = new URLSearchParams({
        product_id: productid,
        stock: "1",
      });

      const response = await fetch(`${url}/carts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyToRequest.toString(),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }

      productInCartRegistered.value = body.data;
      productInCartRegisterLoading.value = false;
    } catch (err) {
      productInCartRegistered.value = null;
      productInCartRegisterError.value =
        err.data?.message || err.message || err;
      productInCartRegisterLoading.value = false;
    }
  };

  const deleteProductInCart = async (itemId) => {
    try {
      productInCartDeleteLoading.value = true;
      const url = import.meta.env.VITE_API_BASE_URL;
      const token = JSON.parse(localStorage.getItem("setSession"))?.token;
      const response = await fetch(`${url}/carts/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }
      productInCartDeleted.value = body.data;
      productInCartDeleteLoading.value = false;
    } catch (err) {
      productInCartDeleted.value = null;
      productInCartDeleteError.value = err.data?.message || err.message || err;
      productInCartDeleteLoading.value = false;
    }
  };

  return {
    getProductsInCart,
    loadingProductsInCart,
    productInCart,
    productsInCartError,
    updateProductStockInCart,
    productStockInCartUpdated,
    productStockInCartUpdatedError,
    productStockInCartUpdatedLoading,
    registerProductInCart,
    productInCartRegisterError,
    productInCartRegisterLoading,
    productInCartRegistered,
    deleteProductInCart,
    productInCartDeleted,
    productInCartDeleteLoading,
    productInCartDeleteError,
  };
});
