<template>
  <main class="book-section" ref="containerRef">
    <div v-if="!shouldUseCarousel || books.length <= 4">
      <div class="category-header">
        <h2>{{ category }}</h2>
      </div>
      <div class="book-list">
        <BookCard 
          v-for="book in books" 
          :key="book.id" 
          :book="book"
        />
      </div>
    </div>

    <div v-else>
      <div v-if="!isExpanded">
        <BaseCarousel :items="books" :title="category">
          <template #item="{ item }">
            <BookCard :book="item" />
          </template>
        </BaseCarousel>
      </div>

      <div v-else>
        <div class="category-header">
          <h2>{{ category }}</h2>
          <button class="toggle-button" @click="isExpanded = false">
            Voir moins
            <i class="pi pi-chevron-up"></i>
          </button>
        </div>
        <div class="book-list expanded">
          <BookCard 
            v-for="book in books" 
            :key="book.id" 
            :book="book"
          />
        </div>
      </div>

      <button 
        v-if="!isExpanded" 
        class="expand-button" 
        @click="isExpanded = true"
      >
        Voir tout ({{ books.length }})
        <i class="pi pi-chevron-down"></i>
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BookCard from './BookCard.vue'
import BaseCarousel from '@/components/base/BaseCarousel.vue'

const props = defineProps({
  category: String,
  books: Array,
})

const isExpanded = ref(false)
const shouldUseCarousel = ref(false)
const containerRef = ref(null)

const checkLayout = () => {
  if (!containerRef.value || props.books.length <= 4) {
    shouldUseCarousel.value = false
    return
  }

  const container = containerRef.value
  const containerWidth = container.clientWidth
  const bookWidth = 250 // Largeur approximative d'un BookCard avec les marges
  const booksPerRow = Math.floor(containerWidth / bookWidth)
  
  // Utiliser le carrousel si on ne peut pas afficher tous les livres sur une ligne
  shouldUseCarousel.value = props.books.length > booksPerRow
}

onMounted(() => {
  checkLayout()
  window.addEventListener('resize', checkLayout)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkLayout)
})
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

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: black;
  text-decoration: underline;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.book-list.expanded {
  animation: expandGrid 0.3s ease-out;
}

@keyframes expandGrid {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toggle-button,
.expand-button {
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

.expand-button {
  margin: 1rem auto;
}

.toggle-button:hover,
.expand-button:hover {
  background-color: #e5e5e5;
}
</style>
