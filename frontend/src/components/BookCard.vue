<template>
  <div class="book-card" @click="navigateToBook">
    <div class="book-cover">
      <BaseBookCover :coverImage="book.coverImage" :altText="book.name" />
    </div>
    <div class="book-info">
      <h3 class="book-title">{{ book.name }}</h3>
      <BaseRating
        v-if="book.rating"
        :modelValue="book.rating"
        :readonly="true"
        class="book-rating"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'
import BaseRating from '@/components/base/BaseRating.vue'
import BaseBookCover from '@/components/base/BaseBookCover.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const truncatedName = computed(() => {
  const maxLength = 20
  return props.book.name && props.book.name.length > maxLength
    ? props.book.name.slice(0, maxLength) + '...'
    : props.book.name
})

const navigateToBook = () => {
  // Implement the logic to navigate to the book detail page
}
</script>

<style scoped>
.book-card {
  background: transparent !important;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  max-width: 220px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.book-cover {
  width: 100%;
  aspect-ratio: 2/3;
  background: transparent !important;
}

.book-info {
  padding: 1rem;
  text-align: center;
  background: transparent !important;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.book-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.book-rating {
  margin-top: 0.5rem;
}
</style>
