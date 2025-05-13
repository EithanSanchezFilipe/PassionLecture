<script setup>
import SearchBar from '../components/SearchBar.vue'
import BookSection from '../components/BookSection.vue'
import { useCategorySearch } from '../components/CategorySearch'

const { filteredCategories, booksByCategory, searchTerm } = useCategorySearch()
</script>

<template>
  <div>
    <SearchBar v-model="searchTerm" />

    <BookSection
      v-for="cat in filteredCategories"
      :key="cat.id"
      :category="cat.name"
      :books="booksByCategory[cat.id]"
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
