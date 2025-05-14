<template>
  <main class="book-section">
    <div class="category-header">
      <h2>{{ category }}</h2>
      <button class="toggle-button" @click="isExpanded = !isExpanded">
        {{ isExpanded ? 'Voir moins' : `Voir tout (${books.length})` }}
        <i :class="['pi', isExpanded ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
      </button>
    </div>

    <div class="book-list" :class="{ expanded: isExpanded }">
      <BookCard
        v-for="(book, index) in books"
        :key="book.id"
        :book="book"
        :class="{ hidden: !isExpanded && index >= 5 }"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import BookCard from './BookCard.vue'

defineProps({
  category: String,
  books: Array,
})

const isExpanded = ref(false)
</script>

<style scoped>
.book-section {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-left: 3rem;
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
  gap: 2rem;
  transition: max-height 0.3s ease;
}

.book-list:not(.expanded) {
  max-height: 400px;
  overflow: hidden;
}

.book-list.expanded {
  max-height: none;
}

.hidden {
  display: none;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expanded .book-card:not(.hidden) {
  animation: slideDown 0.3s ease forwards;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-button:hover {
  background-color: #e5e5e5;
}

.book-preview {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
}
</style>
