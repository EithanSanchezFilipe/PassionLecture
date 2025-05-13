<script setup>
import SearchBar from '../components/SearchBar.vue'
import BookSection from '../components/BookSection.vue'
import { useCategoryBooks } from '../components/useCategoryBooks'

const { categories, filteredBooksByCategory } = useCategoryBooks()
</script>

<template>
  <div>
    <SearchBar />

    <BookSection
      v-for="cat in categories"
      :key="cat.id"
      :category="cat.name"
      :books="filteredBooksByCategory[cat.id]"
    />
  </div>
</template>
<style scoped>
main {
  background-color: var(--sds-color-background-default-default);
  width: var(--sds-responsive-device-width);
}

div {
  padding-left: var(--sds-size-space-0);
  padding-right: var(--sds-size-space-0);
}
</style>
