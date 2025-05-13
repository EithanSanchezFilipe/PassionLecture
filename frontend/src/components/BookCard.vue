<template>
  <main class="book-card">
    <button
      style="border: none; background: none; cursor: pointer"
      @click="$router.push({ name: 'book-detail', params: { id: book.id } })"
    >
      <img :src="`http://localhost:443/api/book/${book.id}/cover`" :alt="book.name" />
    </button>
    <p>{{ book.name }}</p>
    <div class="stars">
      <span v-for="n in 5" :key="n" class="star">
        <i :class="n <= averageRating ? 'text-yellow-400' : 'text-gray-400'">★</i>
      </span>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  book: Object,
})

const averageRating = computed(() => {
  const comments = props.book.comment || []
  if (comments.length === 0) return 5

  const total = comments.reduce((sum, c) => sum + (c.note || 0), 0)
  return Math.round(total / comments.length)
})
</script>
<style scoped>
.book-card {
  display: flex;
  flex-direction: column;
  width: 12rem;
  align-items: center;
  text-align: center;
  margin: 0;
}

.book-card img {
  width: 100%;
  object-fit: fill;
  aspect-ratio: 0.69;
}

.book-card p {
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
}

.stars {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  min-height: 1.5rem;
  max-width: 100%;
  gap: 1rem;
  width: 10.375rem;
}
</style>
