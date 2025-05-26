<script setup>
import { onMounted, ref } from 'vue'
import bookService from '@/services/bookService'
import BookCard from '@/components/BookCard.vue'
import BaseRating from '@/components/base/BaseRating.vue'
import { Skeleton } from 'primevue'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref([])
const CACHE_KEY = 'latestBooksCache'
const CACHE_TIME = 10 * 60 * 1000 // 10 minutes en ms

function goToBook(id) {
  router.push({
    name: 'book-detail',
    params: { id },
  })
}

async function fetchLatestBooks() {
  // Sinon, requête API
  try {
    const response = await bookService.getLatestBooks()
    let rawBooks = response.data.books || response.data
    // Gérer les images
    const processedBooks = await Promise.all(
      rawBooks.map(async (book) => {
        if (book.coverImage) {
          book.coverImage = await bookService.bufferToBase64(book.coverImage)
        }
        return book
      }),
    )
    books.value = processedBooks
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchLatestBooks)
</script>

<template>
  <section class="presentation">
    <h1>Passion Lecture</h1>
    <p>
      Partagez votre amour des livres en découvrant, ajoutant et commentant des ouvrages. Rejoignez
      une communauté de passionnés et échangez vos coups de cœur littéraires !
    </p>
  </section>

  <section class="nouveautes-section">
    <h2 class="nouveautes-title">Nouveautés</h2>
    <div class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card" @click="goToBook(book.id)">
        <template v-if="book.coverImage">
          <img :src="book.coverImage" :alt="book.name" class="book-cover" />
        </template>
        <template v-else>
          <Skeleton class="book-cover skeleton-cover" />
        </template>
        <div class="book-info">
          <h3>{{ book.name }}</h3>
          <BaseRating
            v-if="book.rating || book.avg"
            :modelValue="book.rating || book.avg"
            :readonly="true"
            class="book-rating"
          />
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
  </section>
</template>

<style scoped>
.presentation {
  background-color: #f9f9f9;
  padding: 3em 2em;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.presentation h1 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 0.5em;
}

.presentation p {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}

.nouveautes-section {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nouveautes-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
}
.books-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
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
.book-rating {
  display: flex;
  justify-content: center;
  align-items: center;
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
@media (max-width: 768px) {
  .nouveautes-section {
    padding: 1rem 0;
  }
  .nouveautes-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
