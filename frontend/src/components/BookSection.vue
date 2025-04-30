<template>
  <main class="book-section">
    <h2>{{ category }}</h2>
    <div class="book-list">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </main>
</template>

<script setup>
import BookCard from './BookCard.vue'
defineProps({
  category: String,
  books: Array,
})
</script>
<style scoped>
.book-section {
  width: 100%;
  margin-left: 3rem;

  max-width: 1064px;
  line-height: 1.25;
}

.book-section h2 {
  font-size: 1.875rem;
  font-weight: var(--sds-typography-heading-font-weight, 700);
  color: black;
  text-decoration: underline;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  min-height: 360px;
  text-align: center;
  color: black;
  font-weight: 600;
}
</style>
