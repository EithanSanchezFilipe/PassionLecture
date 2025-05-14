<script setup>
import { ref, computed } from 'vue'
import PrimeDialog from 'primevue/dialog'
import Button from 'primevue/button'
import PrimePaginator from 'primevue/paginator'
import Rating from 'primevue/rating'

const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:visible'])

const first = ref(0)
const rows = ref(5)

const paginatedBooks = computed(() => {
  return props.books.slice(first.value, first.value + rows.value)
})

const onPageChange = (event) => {
  first.value = event.first
}

const closeModal = () => {
  emit('update:visible', false)
}
</script>

<template>
  <PrimeDialog
    :visible="visible"
    :modal="true"
    :header="category"
    class="book-modal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    @update:visible="closeModal"
  >
    <div class="books-grid">
      <div v-for="book in paginatedBooks" :key="book.id" class="book-card">
        <img :src="`http://localhost:443/api/book/${book.id}/cover`" :alt="book.name" />
        <div class="book-info">
          <h3>{{ book.name }}</h3>
          <p>{{ book.summary }}</p>
          <Rating :modelValue="book.avg || 0" readonly :cancel="false" />
          <Button
            @click="$router.push({ name: 'book-detail', params: { id: book.id } })"
            label="Voir détails"
          />
        </div>
      </div>
    </div>

    <PrimePaginator
      v-if="props.books.length > rows"
      v-model:first="first"
      :rows="rows"
      :totalRecords="props.books.length"
      @page="onPageChange"
    />
  </PrimeDialog>
</template>

<style scoped>
.book-modal {
  max-height: 90vh;
  overflow-y: auto;
}

.books-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 1rem;
}

.book-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.book-card img {
  width: 120px;
  height: 180px;
  object-fit: cover;
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.book-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.book-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
