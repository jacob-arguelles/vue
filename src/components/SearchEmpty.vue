<template>
  <div class="search-empty-container">
    <v-empty-state
      icon="mdi-magnify"
      text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
      title="We couldn't find a match."
    />
  </div>
</template>

<style>
.search-empty-container {
  display: flex;
  justify-content: center;
}
</style>
