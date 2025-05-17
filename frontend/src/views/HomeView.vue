<script setup>
import { onMounted, ref } from 'vue'
import bookService from '@/services/bookService'
import HomeBook from '@/components/HomeBook.vue'
import BaseCarousel from '@/components/base/BaseCarousel.vue'

const books = ref(null)

onMounted(async () => {
  try {
    const response = await bookService.getLatestBooks()
    const rawBooks = response.data.books

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
  
  <BaseCarousel 
    v-if="books"
    :items="books"
    title="Nouveautés"
  >
    <template #item="{ item }">
      <HomeBook :book="item" />
    </template>
  </BaseCarousel>
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
</style>
