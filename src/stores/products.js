import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("product", () => {
  const products = ref([]);
  const loadingProductsList = ref(false);
  const productsError = ref("");

  const getProductsList = async (searchKey = "") => {
    try {
      loadingProductsList.value = true;
      const url = import.meta.env.VITE_API_BASE_URL;
      const token = JSON.parse(localStorage.getItem("setSession"))?.token;
      const response = await fetch(
        `${url}/products?search_key=${searchKey || ""}&per_page=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message);
      }
      products.value = body.data;
      loadingProductsList.value = false;
    } catch (err) {
      loadingProductsList.value = false;
      products.value = null;
      productsError.value = err.data?.message || err.message || err;
    }
  };

  return {
    getProductsList,
    loadingProductsList,
    products,
    productsError,
  };
});
