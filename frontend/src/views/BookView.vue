<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref } from 'vue'
const props = defineProps({
  id: {
    required: true,
  },
})
const book = ref(null)
onMounted(() => {
  bookService
    .getBook(props.id)
    .then((response) => {
      book.value = response.data
      console.log(book)
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>
<template>
  <div v-if="book">
    <h1>{{ book.name }}</h1>
  </div>
</template>
