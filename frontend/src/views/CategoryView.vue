<script setup>
import SearchBar from '@/composables/SearchBarCat.vue'
import { useCategorySearch } from '@/composables/CategorySearch'
import { computed, onMounted, ref, watch } from 'vue'
import Carousel from 'primevue/carousel'
import Skeleton from 'primevue/skeleton'
import BaseRating from '@/components/base/BaseRating.vue'
import { useRouter } from 'vue-router'

const FilterNote = ref([])
const FilterCat = ref([])
const bookByCat = ref({})
const router = useRouter()

const { filteredCategories, booksByCategory, searchTerm, isLoading, error } = useCategorySearch()

const filterBooks = () => {
  const filtered = {}

  for (const [catId, books] of Object.entries(booksByCategory.value)) {
    const category = filteredCategories.value.find((c) => c.id.toString() === catId)

    if (FilterCat.value.length > 0 && (!category || !FilterCat.value.includes(category.name))) {
      continue
    }

    let matchingBooks = books

    if (FilterNote.value.length > 0) {
      matchingBooks = matchingBooks.filter((book) => FilterNote.value.includes(book.avg))
    }

    if (matchingBooks.length > 0) {
      filtered[catId] = matchingBooks
    }
  }

  bookByCat.value = filtered
}

watch([FilterNote, FilterCat], filterBooks)

onMounted(() => {
  bookByCat.value = booksByCategory.value
})

const categoriesWithBooks = computed(() =>
  filteredCategories.value.filter((cat) => (bookByCat.value[cat.id] || []).length > 0),
)

const getLimitedBooks = (books) => books.slice(0, 8)
const shouldShowCarousel = (books) => books.length >= 8
const goToBook = (id) => router.push(`/book/${id}`)
</script>

<template>
  <div class="category-page">
    <div id="sideBar">
      <div id="note">
        <h3>Filtrer par note</h3>
        <div class="single-input" v-for="n in 5" :key="n">
          <input
            type="checkbox"
            v-model="FilterNote"
            :value="n"
            :name="'note' + n"
            :id="'note' + n"
          />
          <label :for="'note' + n">
            <BaseRating :modelValue="n" :readonly="true" />
          </label>
        </div>
      </div>

      <div id="categoryFilter">
        <h3>Filtrer par catégorie</h3>
        <div class="single-input" v-for="cat in filteredCategories" :key="cat.id">
          <input
            type="checkbox"
            v-model="FilterCat"
            :value="cat.name"
            :name="'cat' + cat.id"
            :id="'cat' + cat.id"
          />
          <label :for="'cat' + cat.id">{{ cat.name }}</label>
        </div>
      </div>
    </div>
    <div id="main">
      <div class="category-header">
        <h1>Catégories</h1>
        <div class="search-container">
          <SearchBar v-model="searchTerm" />
        </div>
      </div>
      <section id="category">
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
          <div v-if="categoriesWithBooks.length === 0" class="no-results">
            <p>Aucune catégorie avec des livres trouvée</p>
          </div>
          <div class="categories-container">
            <div v-for="cat in categoriesWithBooks" :key="cat.id" class="category-section">
              <h2 class="category-title">{{ cat.name }}</h2>
              <template v-if="shouldShowCarousel(bookByCat[cat.id] || [])">
                <Carousel
                  :value="getLimitedBooks(bookByCat[cat.id] || [])"
                  :numVisible="4"
                  :numScroll="1"
                  :circular="true"
                  class="custom-carousel"
                >
                  <template #item="{ data }">
                    <div class="book-card" @click="goToBook(data.id)">
                      <template v-if="data.coverImage">
                        <img :src="data.coverImage" :alt="data.name" class="book-cover" />
                      </template>
                      <template v-else>
                        <Skeleton class="book-cover skeleton-cover" />
                      </template>
                      <div class="book-info">
                        <h3>{{ data.name }}</h3>
                        <p class="book-author">
                          {{
                            data.t_author
                              ? data.t_author.firstname + ' ' + data.t_author.lastname
                              : 'Auteur inconnu'
                          }}
                        </p>
                      </div>
                    </div>
                  </template>
                </Carousel>
              </template>
              <div v-else class="books-grid">
                <div
                  v-for="book in bookByCat[cat.id] || []"
                  :key="book.id"
                  class="book-card"
                  @click="goToBook(book.id)"
                >
                  <template v-if="book.coverImage">
                    <img :src="book.coverImage" :alt="book.name" class="book-cover" />
                  </template>
                  <template v-else>
                    <Skeleton class="book-cover skeleton-cover" />
                  </template>
                  <div class="book-info">
                    <h3>{{ book.name }}</h3>
                    <p class="book-author">
                      {{
                        book.t_author
                          ? book.t_author.firstname + ' ' + book.t_author.lastname
                          : 'Auteur inconnu'
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  background: #fff;
  display: flex;
}
#sideBar {
  background-color: #f4f4f4;
  padding: 2rem 1rem;
  width: 250px;
  min-height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#note,
#categoryFilter {
  display: flex;
  flex-direction: column;
}

#note h3,
#categoryFilter h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  border-left: 4px solid #3498db;
  padding-left: 0.5rem;
}

.single-input {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.single-input input[type='checkbox'] {
  accent-color: #3498db;
  width: 1rem;
  height: 1rem;
  margin: 0;
  cursor: pointer;
}

.single-input label {
  font-size: 0.95rem;
  color: #34495e;
  cursor: pointer;
  display: flex;
  align-items: center;
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

.categories-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-left: 0;
  align-items: flex-start;
}

.category-section {
  margin-bottom: 2rem;
  margin-left: 2rem;
  width: 100%;
}

.category-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 4px solid #3498db;
  text-align: left;
}

.books-grid {
  display: flex;
  padding-right: 1rem;
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
  margin-top: 1rem;
  max-width: 200px;
}

.book-info h3 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0.5rem 0 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#category {
  align-self: flex-start;
}
.skeleton-container {
  margin-bottom: 3rem;
}
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

.custom-carousel {
  background: transparent;
}

:deep(.p-carousel-indicators) {
  display: none;
}

:deep(.p-carousel-prev),
:deep(.p-carousel-next) {
  background: rgba(255, 255, 255, 0.9) !important;
  border-radius: 50% !important;
  width: 3rem !important;
  height: 3rem !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

:deep(.p-carousel-prev:hover),
:deep(.p-carousel-next:hover) {
  background: #fff !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
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
  }
  .book-info {
    max-width: 150px;
  }
}
</style>
