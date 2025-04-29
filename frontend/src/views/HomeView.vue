<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref } from 'vue'
import HomeBook from '@/components/HomeBook.vue'
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
    <HomeBook v-for="book in books" :key="book.id" :book="book"></HomeBook>
  </div>
</template>
