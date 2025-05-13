<template>
  <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }" class="book-link">
    <img v-if="book.coverImage" :src="book.coverImage" alt="Book cover" />
    <Skeleton v-if="!book.coverImage" :height="'17em'" :class="'mb-2'"></Skeleton>
    <h3>{{ truncatedName }}</h3>
    <Rating :default-value="book.avg" readonly />
  </RouterLink>
</template>

<script setup>
import Rating from 'primevue/rating'
import Skeleton from 'primevue/skeleton'
import { computed } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const truncatedName = computed(() => {
  const maxLength = 20
  return props.book.name.length > maxLength
    ? props.book.name.slice(0, maxLength) + '...'
    : props.book.name
})
</script>

<style scoped>
.book-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  width: 12em;
  margin: 1em;
  position: relative;
  padding-bottom: 2em;
}

.p-skeleton {
  background-color: #e0e0e0;
}

.book-link img {
  height: 17em;
  width: 100%;
  object-fit: cover;
}

.book-link h3 {
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
