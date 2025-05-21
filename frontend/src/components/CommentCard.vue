<script setup>
import BaseRating from '@/components/base/BaseRating.vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  bookName: {
    type: String,
    default: '',
  },
  showBookInfo: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['viewBook'])

const viewBook = () => {
  emit('viewBook', props.comment.book_fk)
}

// Formatage de la date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <div class="comment-card">
    <div class="comment-header">
      <h4 v-if="showBookInfo">{{ bookName || 'Livre inconnu' }}</h4>
      <p v-else class="username">{{ comment.username }}</p>
      <BaseRating :modelValue="comment.note" :readonly="true" class="comment-rating" />
      <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
    </div>
    <p class="comment-text">{{ comment.message || comment.text || '' }}</p>
    <button v-if="showBookInfo" class="view-book-btn" @click="viewBook">Voir le livre</button>
  </div>
</template>

<style scoped>
.comment-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
  max-width: 100%;
}

.comment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.comment-header {
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  width: 100%;
  text-align: center;
}

.comment-header h4 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  text-align: center;
  font-weight: 700;
}

.username {
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  text-align: center;
}

.comment-rating {
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.comment-date {
  font-size: 0.9rem;
  color: #6c757d;
  display: block;
  text-align: center;
  font-style: italic;
}

.comment-text {
  color: #444;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
}

.view-book-btn {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  letter-spacing: 0.03em;
}

.view-book-btn:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.25);
}
</style>
