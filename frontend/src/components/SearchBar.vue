<script setup>
import { ref } from 'vue'
import loupe from '@/assets/loupe.svg'
import AutoComplete from 'primevue/autocomplete'
import SearchService from '@/services/SearchService'

const value = ref('')
const suggestions = ref([])

// Méthode appelée automatiquement par AutoComplete quand l'utilisateur tape
const searchSuggestions = async (event) => {
  const term = event.query.trim()

  if (term.length < 3) {
    suggestions.value = []
    return
  }

  const results = []

  try {
    const bookResponse = await SearchService.search(term, 'book')
    const books = bookResponse.data || []
    results.push(...books.map((book) => ({ name: book.name, type: 'book' })))
  } catch (error) {
    console.warn('Erreur lors de la récupération des livres', error)
  }

  try {
    const categoryResponse = await SearchService.search(term, 'category')
    const categories = categoryResponse.data || []
    results.push(...categories.map((category) => ({ name: category.name, type: 'category' })))
  } catch (error) {
    console.warn('Erreur lors de la récupération des catégories', error)
  }

  suggestions.value = results
}
</script>

<template>
  <div class="search-bar-container">
    <div class="input-wrapper">
      <img :src="loupe" alt="Rechercher" class="icon" />
      <AutoComplete
        v-model="value"
        :suggestions="suggestions"
        field="name"
        placeholder="Rechercher..."
        @complete="searchSuggestions"
      >
        <template>
          <div class="suggestion-item">
            <span class="suggestion-type"></span>
            {{ item.name }}
          </div>
        </template>
      </AutoComplete>
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 5em;
  margin-bottom: 5em;
  width: 100%;
  max-width: 500px;
  background-color: #f5f5f5;
}

.search-bar {
  width: 100%;
  min-height: 2.25rem;
  white-space: nowrap;
}

.input-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  width: 100%;
  min-height: 2.25rem;
  border: 1px solid black;
  border-radius: 0.75rem;
  background-color: rgba(250, 250, 250, 0.9);
}

.input-wrapper .icon {
  width: 1.75rem;
  padding: 0.375rem;
  cursor: pointer;
}

.suggestions-list {
  margin-top: 0.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 200px;
}

.suggestion-item {
  padding: 0.5rem;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #eee;
}

.suggestion-type {
  font-weight: bold;
  margin-right: 0.5rem;
  color: #888;
}
</style>
