<script setup>
import { onWatcherCleanup, watch, ref } from "vue";
import { useProductsStore } from "@/stores/products";

const searchTypeOptions = [
  { title: "Search by product name", value: "search_by_product" },
  { title: "Search by category name", value: "search_by_category" },
];

const emit = defineEmits(["update:search"]);

const { getProductsList } = useProductsStore();

const searchQuery = ref("");
const searchPlaceHolder = ref("Search by product name");

watch(searchQuery, () => {
  let timer;
  if (
    searchPlaceHolder.value === "Search by product name" &&
    searchQuery.value
  ) {
    timer = setTimeout(() => {
      getProductsList(searchQuery.value);
    }, 500);
  } else if (searchQuery.value) {
    emit("update:search", searchQuery.value);
  } else {
    getProductsList();
  }
  onWatcherCleanup(() => {
    Boolean(timer) && clearTimeout(timer);
  });
});

const onSearchTypeClick = (data) => {
  searchPlaceHolder.value = data.title;
  searchQuery.value = "";
};
</script>
<template>
  <div class="search-container">
    <v-text-field
      v-model="searchQuery"
      :placeholder="searchPlaceHolder"
      clearable
      outlined
      dense
      hide-details
    />
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            height="60px"
            viewBox="0 0 30 30"
          >
            <path
              d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
            ></path>
          </svg>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in searchTypeOptions"
          :key="index"
          :value="item.value"
          @click="onSearchTypeClick(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style>
.search-container {
  display: flex;
}
</style>
