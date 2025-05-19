<template>
  <div class="book-filter">
    <h1>Résultats de recherche</h1>
    
    <!-- Filtres par catégorie -->
    <div class="category-filters">
      <button 
        class="category-btn"
        :class="{ active: selectedCategory === null }"
        @click="handleCategorySelect(null)"
      >
        Toutes les catégories
      </button>
      <button 
        v-for="category in categories" 
        :key="category.id"
        class="category-btn"
        :class="{ active: selectedCategory === category.id }"
        @click="handleCategorySelect(category.id)"
      >
        {{ category.name }}
      </button>
    </div>

    <div v-if="loading" class="loading">
      <span>Chargement...</span>
    </div>
    <div v-else>
      <div v-if="filteredBooks.length === 0" class="no-results">
        <p v-if="selectedCategory">
          Aucun livre ne correspond à votre recherche "{{ searchTerm }}" dans cette catégorie
        </p>
        <p v-else>
          Aucun livre ne correspond à votre recherche "{{ searchTerm }}"
        </p>
      </div>
      <div v-else class="books-grid">
        <BookCard 
          v-for="book in filteredBooks" 
          :key="book.id" 
          :book="book"
          class="book-card"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import BookCard from '@/components/BookCard.vue'
import SearchService from '@/services/SearchService'
import categoryService from '@/services/categoryService'

const route = useRoute()
const books = ref([])
const categories = ref([])
const loading = ref(true)
const searchTerm = ref('')
const selectedCategory = ref(null)

// Filtrer les livres par catégorie
const filteredBooks = computed(() => {
  if (selectedCategory.value === null) return books.value
  return books.value.filter(book => Number(book.categoryId) === Number(selectedCategory.value))
})

const handleCategorySelect = (categoryId) => {
  selectedCategory.value = categoryId
  console.log('Catégorie sélectionnée:', categoryId)
}

const fetchCategories = async () => {
  try {
    const response = await categoryService.getAllCategory().then((res) => {
      return res.data.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }))})
    categories.value = response || []
    console.log('Catégories récupérées:', categories.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    categories.value = []
  }
}

const fetchBooks = async () => {
  loading.value = true
  try {
    searchTerm.value = route.query.search || ''
    if (searchTerm.value) {
      const response = await SearchService.search(searchTerm.value, 'book')
      books.value = response.data || []
    } else {
      books.value = []
    }
  } catch (error) {
    console.error('Erreur lors de la recherche des livres:', error)
    books.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.query.search, () => {
  fetchBooks()
})

onMounted(() => {
  fetchCategories()
  fetchBooks()
})
</script>

<style scoped>
.book-filter {
  padding: 2rem;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  background: #f5f5f5;
}

.category-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  font-style: italic;
  color: #666;
}

.book-card {
  transition: transform 0.2s ease;
}

.book-card:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .book-filter {
    padding: 1rem;
  }

  .category-filters {
    margin: 1rem 0;
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style> 