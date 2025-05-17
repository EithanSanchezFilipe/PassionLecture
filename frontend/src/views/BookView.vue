<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Comment from '@/components/Comment.vue'
import CommentForm from '@/components/CommentForm.vue'
import BaseRating from '@/components/base/BaseRating.vue'
import SearchBarBook from '@/composables/SearchBarBook.vue'
import BaseCarousel from '@/components/base/BaseCarousel.vue'
import Skeleton from 'primevue/skeleton'

const router = useRouter()
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const book = ref(null)
const comments = ref(null)
const avg = ref(1)
const searchTerm = ref('')

const latestComments = computed(() => {
  if (!comments.value) return []
  return comments.value.slice(0, 3)
})

watch(searchTerm, async (newValue) => {
  if (newValue && typeof newValue === 'object' && newValue.id) {
    router.push({ name: 'book-detail', params: { id: newValue.id }})
  }
})

onMounted(async () => {
  try {
    const response = await bookService.getBook(props.id)
    const data = response.data

    if (data.coverImage) {
      data.coverImage = await bookService.bufferToBase64(data.coverImage)
    }

    book.value = data
    fetchComments()
  } catch (e) {
    console.error(e)
  }
})

const fetchComments = () => {
  bookService
    .getBookComments(props.id)
    .then((response) => {
      comments.value = response.data.comments
      if (!comments.value || comments.value.length === 0) {
        avg.value = 1
      } else {
        avg.value = Math.round(
          comments.value.reduce((sum, comment) => sum + comment.note, 0) / comments.value.length
        )
      }
    })
    .catch((e) => {
      console.error(e)
    })
}

const handleCommentAdded = () => {
  fetchComments()
}
</script>

<template>
  <div class="book-view">
    <SearchBarBook v-model="searchTerm" />
    
    <div v-if="book" class="book-content">
      <div class="main-content">
        <div class="header-section">
          <div class="left-section">
            <div class="cover-wrapper">
              <Skeleton v-if="!book.coverImage" class="cover-image" />
              <img 
                v-else
                :src="book.coverImage" 
                :alt="book.name" 
                class="cover-image"
                @error="$event.target.style.display = 'none'"
              />
            </div>
            <div class="book-info">
              <h1>{{ book.name }}</h1>
              <BaseRating :model-value="avg" readonly class="rating" />
              <div class="book-metadata">
                <p>Année d'édition: {{ book.editionYear }}</p>
                <p>Pages: {{ book.pages }}</p>
                <p v-if="book.t_category">Catégorie: {{ book.t_category.name }}</p>
              </div>
            </div>
          </div>
          
          <div class="summary-section">
            <h2>Résumé</h2>
            <p v-if="book.summary" class="summary">{{ book.summary }}</p>
            <p v-else class="no-summary">Aucun résumé disponible</p>
          </div>
        </div>

        <section class="comments-section">
          <h2>Commentaires</h2>
          
          <div class="featured-comments" v-if="latestComments.length > 0">
            <h3>Derniers avis</h3>
            <div class="comments-grid">
              <Comment
                v-for="comment in latestComments"
                :key="comment.id"
                :comment="comment"
                class="comment-card"
              />
            </div>
          </div>

          <div class="all-comments">
            <h3>Tous les commentaires</h3>
            <div class="comments-grid-all">
              <Comment
                v-if="comments && comments.length"
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                class="comment-card"
              />
              <p v-else class="no-comments">Aucun commentaire pour le moment</p>
            </div>
          </div>

          <CommentForm :id="book.id" @commentAdded="handleCommentAdded" class="comment-form" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-view {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.book-content {
  margin-top: 2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1800px;
  margin: 0 auto;
}

.header-section {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 4rem;
  background-color: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 2rem;
}

.cover-wrapper {
  width: 100%;
  position: relative;
}

.cover-image {
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.cover-image:hover {
  transform: scale(1.02);
}

.book-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
  line-height: 1.2;
}

.rating {
  font-size: 1.4rem;
}

.book-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.book-metadata p {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 2rem;
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
}

.summary {
  color: #444;
  line-height: 1.8;
  font-size: 1.2rem;
  max-width: 900px;
}

.comments-section {
  background-color: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.featured-comments {
  margin-bottom: 4rem;
}

.comments-grid,
.comments-grid-all {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.comment-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.comment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.no-comments {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 2rem 0;
  grid-column: 1 / -1;
}

.comment-form {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 2px solid #eee;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 1400px) {
  .header-section {
    grid-template-columns: 350px 1fr;
    gap: 3rem;
  }
}

@media (max-width: 1024px) {
  .book-view {
    padding: 1rem;
  }

  .header-section {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 2rem;
  }

  .left-section {
    align-items: center;
    text-align: center;
    position: static;
  }

  .cover-image {
    max-width: 350px;
  }

  .book-metadata {
    align-items: center;
  }

  .summary-section {
    padding: 0;
  }

  .comments-section {
    padding: 2rem;
  }

  .comments-grid,
  .comments-grid-all {
    grid-template-columns: 1fr;
  }
}

:deep(.p-skeleton) {
  border-radius: 8px;
  height: auto !important;
  aspect-ratio: 2/3;
}
</style>

