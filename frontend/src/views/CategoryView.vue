<script setup>
import SearchBar from '@/composables/SearchBarCat.vue'
import BookSection from '@/components/BookSection.vue'
import { useCategorySearch } from '@/composables/CategorySearch'
import ProgressSpinner from 'primevue/progressspinner'

const { filteredCategories, booksByCategory, searchTerm, isLoading, error } = useCategorySearch()
</script>

<template>
  <div class="category-view">
    <SearchBar v-model="searchTerm" />

    <div v-if="isLoading" class="loading">
      <ProgressSpinner />
      <p>Chargement des catégories...</p>
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="filteredCategories.length === 0" class="no-results">
        <p>Aucune catégorie trouvée</p>
      </div>

      <BookSection
        v-for="cat in filteredCategories"
        :key="cat.id"
        :category="cat.name"
        :books="booksByCategory[cat.id] || []"
      />
    </div>
  </div>
</template>

<style scoped>
.category-view {
  padding: 1rem;
}

.loading,
.error,
.no-results {
  text-align: center;
  padding: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error {
  color: red;
}
</style>
