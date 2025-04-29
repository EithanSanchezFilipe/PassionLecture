<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref } from 'vue'

const books = ref(null)

onMounted(() => {
  bookService
    .getLatestBooks()
    .then((response) => {
      books.value = response.data.book.map((book) => {
        if (book.coverImage) {
          book.coverImage = bookService.bufferToBase64(book.coverImage)
        }
        return book
      })
      console.log(books)
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div class="books">
    <div class="book" v-for="book in books">
      <h1>{{ book.name }}</h1>
    </div>
  </div>
</template>
