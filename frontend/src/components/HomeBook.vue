<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }">
    <h1>{{ book.name }}</h1>
    <img v-if="book.coverImage" :src="book.coverImage" alt="" />
  </RouterLink>
</template>
<style scoped></style>
