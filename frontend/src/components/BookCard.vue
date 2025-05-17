<template>
 <main class="book-card">
    <button
      style="border: none; background: none; cursor: pointer"
      @click="$router.push({ name: 'book-detail', params: { id: book.id } })"
    >
      <img v-if="book.coverImage" :src="book.coverImage" alt="Book cover" />
      <Skeleton v-if="!book.coverImage" :height="'17em'" :class="'mb-2'"></Skeleton>
      <h3>{{ truncatedName }}</h3>
      <BaseRating :model-value="book.avg" readonly />
    </button>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'
import BaseRating from '@/components/base/BaseRating.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  }
})

const truncatedName = computed(() => {
  const maxLength = 20
  return props.book.name && props.book.name.length > maxLength
    ? props.book.name.slice(0, maxLength) + '...'
    : props.book.name
})
</script>

<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  width: 12em;
  align-items: center;
  text-align: center;
  margin: 1em;
  position: relative;
  padding-bottom: 2em;
  transition: transform 0.2s ease;
}

.book-card:hover {
  transform: translateY(-5px);
}

.p-skeleton {
  background-color: #e0e0e0;
  width: 100%;
}

.book-card img {
  width: 100%;
  height: 17em;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.book-card p {
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
}

h3 {
  margin-top: 0.5em;
  text-align: center;
  font-size: 0.95em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.p-rating {
  gap: 10px;
}

.p-rating * {
  height: 20px;
  color: #ffcc00;
}
</style>
