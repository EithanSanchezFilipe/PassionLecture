<script setup>
import bookService from '@/services/bookService'
import { onMounted, ref, watch, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import CommentForm from '@/components/CommentForm.vue'
import BaseRating from '@/components/base/BaseRating.vue'
import SearchBarBook from '@/composables/SearchBarBook.vue'
import Skeleton from 'primevue/skeleton'
import Popup from '@/components/Popup.vue'
import AddBookStepper from '@/composables/AddBookStepper.vue'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'
import categoryService from '@/services/categoryService'
import CommentCard from '@/components/CommentCard.vue'

const GStore = inject('GStore')
const auth = useAuthStore()
auth.Authorize()
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
const showDeletePopup = ref(false)
const showUpdatePopup = ref(false)
const showEditStepper = ref(false)
const currentUser = ref(null)
const categories = ref([])

const latestComments = computed(() => {
  if (!comments.value) return []
  return comments.value.slice(0, 3)
})

// Check if current user is the book owner or an admin
const canModifyBook = computed(() => {
  if (!book.value) return false

  // If we have a loaded user from profile API call
  if (currentUser.value) {
    return book.value.user_fk === currentUser.value.id || currentUser.value.admin === true
  }

  // Or if we have a user in the auth store
  if (auth.user) {
    return book.value.user_fk === auth.user.id || auth.user.admin === true
  }

  return false
})

watch(searchTerm, async (newValue) => {
  if (newValue && typeof newValue === 'object' && newValue.id) {
    router.push({ name: 'book-detail', params: { id: newValue.id } })
  }
})

onMounted(async () => {
  try {
    // Load categories
    const categoriesResponse = await categoryService.getAllCategory()
    if (categoriesResponse && categoriesResponse.data) {
      categories.value = categoriesResponse.data.categories
    }

    // Load book data
    const response = await bookService.getBook(props.id)
    const data = response.data

    if (data.coverImage) {
      data.coverImage = await bookService.bufferToBase64(data.coverImage)
    }

    book.value = data
    fetchComments()

    // Load user profile data
    try {
      const userResponse = await authService.getProfile()
      if (userResponse && userResponse.data) {
        currentUser.value = userResponse.data.user
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
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
          comments.value.reduce((sum, comment) => sum + comment.note, 0) / comments.value.length,
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

const deleteBook = async () => {
  try {
    // Close the popup before doing anything else
    showDeletePopup.value = false

    // Get book ID from current book
    const bookId = book.value.id
    console.log('Deleting book with ID:', bookId)

    // Call the delete API
    const response = await bookService.deleteBook(bookId)
    console.log('Delete response:', response)

    // Show success message
    if (GStore) {
      GStore.flashMessage = 'Le livre a été supprimé avec succès'
      GStore.isSuccess = true
    }

    // Redirect to home page with direct navigation
    setTimeout(() => {
      // Match the exact route name from router configuration (case-sensitive)
      router.push({ name: 'Home' }).catch((err) => {
        console.error('Navigation error:', err)
        // Fallback to direct path if named route fails
        router.push('/')
      })
    }, 100)
  } catch (error) {
    console.error('Error deleting book:', error)
    let errorMessage = 'Erreur lors de la suppression du livre'

    if (error.response) {
      console.error('Error details:', error.response.data)
      errorMessage = error.response.data.message || errorMessage
    }

    // Show error message
    if (GStore) {
      GStore.flashMessage = errorMessage
      GStore.isSuccess = false
    }
  }
}

const editBook = () => {
  showUpdatePopup.value = false
  showEditStepper.value = true
}

const handleUpdateBook = async (updatedBookData) => {
  try {
    // Make sure we're working with the correct book ID
    const bookId = book.value.id

    console.log('Updating book with ID:', bookId)
    console.log('Update data:', updatedBookData)

    // Ensure numeric values are properly converted
    const dataToSend = {
      ...updatedBookData,
      editionYear: Number(updatedBookData.editionYear),
      pages: Number(updatedBookData.pages),
      category_fk: Number(updatedBookData.category_fk),
    }

    // Call the update API
    const updateResponse = await bookService.updateBook(bookId, dataToSend)
    console.log('Update response:', updateResponse)

    // Refresh the book data
    const response = await bookService.getBook(bookId)
    const data = response.data

    if (data.coverImage) {
      data.coverImage = await bookService.bufferToBase64(data.coverImage)
    }

    book.value = data

    // Show success message
    if (GStore) {
      GStore.flashMessage = 'Le livre a été mis à jour avec succès'
      GStore.isSuccess = true
    }
  } catch (error) {
    console.error('Error updating book:', error)
    let errorMessage = 'Erreur lors de la mise à jour du livre'

    if (error.response) {
      console.error('Error details:', error.response.data)
      errorMessage = error.response.data.message || errorMessage
    }

    // Show error message
    if (GStore) {
      GStore.flashMessage = errorMessage
      GStore.isSuccess = false
    }
  }
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

              <!-- Book action buttons (only visible to book owner or admin) -->
              <div v-if="canModifyBook" class="book-actions">
                <button class="edit-btn" @click="showUpdatePopup = true">Modifier</button>
                <button class="delete-btn" @click="showDeletePopup = true">Supprimer</button>
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
              <CommentCard
                v-for="comment in latestComments"
                :key="comment.id"
                :comment="comment"
                :showBookInfo="false"
              />
            </div>
          </div>

          <div class="all-comments">
            <h3>Tous les commentaires</h3>
            <div class="comments-grid-all">
              <CommentCard
                v-if="comments && comments.length"
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :showBookInfo="false"
              />
              <p v-else class="no-comments">Aucun commentaire pour le moment</p>
            </div>
          </div>

          <CommentForm :id="book.id" @commentAdded="handleCommentAdded" class="comment-form" />
        </section>
      </div>
    </div>

    <!-- Popups for confirmation -->
    <Popup
      action="update"
      :show="showUpdatePopup"
      @confirm="editBook"
      @cancel="showUpdatePopup = false"
    />

    <Popup
      action="delete"
      :show="showDeletePopup"
      @confirm="deleteBook"
      @cancel="showDeletePopup = false"
    />

    <!-- Edit Book Form with Stepper -->
    <AddBookStepper
      v-if="book"
      v-model:visible="showEditStepper"
      :categories="categories"
      @save="handleUpdateBook"
      :initial-data="{
        name: book.name,
        passage: book.passage || '',
        summary: book.summary || '',
        editionYear: book.editionYear || new Date().getFullYear(),
        pages: book.pages || null,
        category_fk: book.category_fk || null,
      }"
      :is-editing="true"
    />
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
  background-color: #e0e0e0;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.cover-image:hover {
  transform: scale(1.02);
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.2rem;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin: auto;
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

.book-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.edit-btn,
.delete-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
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

.all-comments h3,
.featured-comments h3 {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.all-comments h3::after,
.featured-comments h3::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #6366f1;
  margin: 0.75rem auto 0;
  border-radius: 3px;
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
