<script setup>
import { onMounted, ref } from 'vue'
import bookService from '@/services/bookService'
import HomeBook from '@/components/HomeBook.vue'

const books = ref(null)

onMounted(() => {
  bookService
    .getLatestBooks()
    .then((response) => {
      books.value = response.data.books.map((book) => {
        if (book.coverImage) {
          book.coverImage = bookService.bufferToBase64(book.coverImage)
        }
        return book
      })
      console.log(books)
    })
    .catch((err) => {
      console.error(err)
    })
})
</script>

<template>
  <section class="presentation">
    <h1>Passion Lecture</h1>
    <p>
      Partagez votre amour des livres en découvrant, ajoutant et commentant des ouvrages. Rejoignez
      une communauté de passionnés et échangez vos coups de cœur littéraires !
    </p>
  </section>
  <section class="new-books-section">
    <h2>Nouveautés</h2>
    <div class="books">
      <HomeBook v-for="book in books" :key="book.id" :book="book" />
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

.new-books-section {
  padding: 3em 2em;
  background-color: #ffffff;
}

.new-books-section h2 {
  font-size: 2rem;
  text-decoration: underline;
  color: black;
  margin-bottom: 1.5em;
  text-align: center;
}

.books {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
}
</style>
