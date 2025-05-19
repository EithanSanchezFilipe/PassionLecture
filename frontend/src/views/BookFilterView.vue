<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Skeleton from 'primevue/skeleton'
import SearchBarBook from '@/composables/SearchBarBook.vue'
import { useBookSearch } from '@/composables/BookSearch.js'

const route = useRoute()
const { books, searchTerm, isLoading, error, loadBooks, getAuthorName } = useBookSearch()

// Charger les livres au montage du composant et quand la recherche change
onMounted(() => {
  const query = route.query.search
  if (query) {
    searchTerm.value = query
    loadBooks(query)
  }
})

// Surveiller les changements dans les paramètres d'URL
watch(() => route.query.search, (newValue) => {
  if (newValue) {
    searchTerm.value = newValue
    loadBooks(newValue)
  }
})

// Surveiller les changements dans searchTerm pour mettre à jour les résultats
watch(() => searchTerm.value, (newValue) => {
  loadBooks(newValue)
})
</script>

<template>
  <div class="category-page">
    <div class="category-header">
      <h1>Résultats de recherche</h1>
      <div class="search-container">
        <SearchBarBook v-model="searchTerm" />
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <div v-for="n in 3" :key="n" class="skeleton-container">
        <Skeleton class="skeleton-title" />
        <div class="skeleton-books">
          <Skeleton v-for="i in 4" :key="i" class="skeleton-book" />
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div v-if="books.length === 0" class="no-results">
        <p>Aucun livre ne correspond à votre recherche <strong>"{{ searchTerm }}"</strong></p>
      </div>

      <div class="books-grid">
        <div v-for="book in books" :key="book.id" class="book-card" @click="$router.push(`/book/${book.id}`)">
          <template v-if="book.coverImage">
            <img :src="book.coverImage" :alt="book.name" class="book-cover" />
          </template>
          <template v-else>
            <Skeleton class="book-cover skeleton-cover" />
          </template>
          <div class="book-info">
            <h3>{{ book.name }}</h3>
            <p class="book-author">{{ getAuthorName(book) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  background: #fff;
}

.category-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
}

.category-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.search-container {
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;
  justify-items: start;
  justify-content: start;
  width: 100%;
}

.book-card {
  padding: 1rem;
  text-align: left;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skeleton-cover {
  width: 200px !important;
  height: 300px !important;
  border-radius: 8px;
  background: #e9ecef;
}

.book-info {
  text-align: center;
  margin-top: 1rem;
  max-width: 200px;
}

.book-info h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skeleton-container {
  margin-bottom: 3rem;
}

.skeleton-title {
  height: 2rem;
  width: 200px;
  margin-bottom: 1rem;
}

.skeleton-books {
  display: flex;
  gap: 1rem;
  overflow-x: hidden;
}

.skeleton-book {
  width: 200px;
  height: 300px;
  border-radius: 8px;
}

.error,
.no-results {
  text-align: center;
  padding: 3rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem 0;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
}

.no-results {
  color: #6c757d;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .category-header h1 {
    font-size: 2rem;
  }
  .book-cover,
  .skeleton-cover {
    width: 150px !important;
    height: 225px !important;
  }
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding: 0 1rem;
  }
  .book-info {
    max-width: 150px;
  }
}
</style> 