<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'
import bookService from '@/services/bookService'
import { useRouter } from 'vue-router'
import BaseRating from '@/components/base/BaseRating.vue'
import { Skeleton } from 'primevue'

const auth = useAuthStore()
const router = useRouter()
const userProfile = ref(null)
const userBooks = ref([])
const userComments = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const activeTab = ref('all') // Options: 'all', 'read', 'commented'

// Vérifier que l'utilisateur est connecté
if (!auth.isAuthenticated) {
  router.push({ name: 'Login' })
}

// Statistiques calculées
const stats = computed(() => {
  if (!userBooks.value) return { total: 0, read: 0, commented: 0, averageRating: 0 }

  const read = userBooks.value.filter((book) => book.isRead).length
  const commented = userComments.value.length
  const ratings = userComments.value.map((comment) => comment.note || 0)
  const averageRating = ratings.length
    ? parseFloat((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
    : 0

  return {
    total: userBooks.value.length,
    read,
    commented,
    averageRating,
  }
})

// Filtrer les livres en fonction de l'onglet actif
const filteredBooks = computed(() => {
  if (activeTab.value === 'all') return userBooks.value
  if (activeTab.value === 'read') return userBooks.value.filter((book) => book.isRead)
  if (activeTab.value === 'commented') {
    const commentedBookIds = userComments.value.map((comment) => comment.book_fk)
    return userBooks.value.filter((book) => commentedBookIds.includes(book.id))
  }
  return userBooks.value
})

// Charger les données du profil utilisateur
onMounted(async () => {
  try {
    isLoading.value = true
    const response = await authService.getProfile()
    userProfile.value = response.data.user

    // Récupérer les commentaires directement depuis la réponse API
    if (userProfile.value && userProfile.value.t_comments) {
      userComments.value = userProfile.value.t_comments
    }

    // Utiliser directement les livres inclus dans la réponse du profil
    if (
      userProfile.value &&
      userProfile.value.t_books &&
      Array.isArray(userProfile.value.t_books)
    ) {
      // Traitement des images de couverture
      userBooks.value = await Promise.all(
        userProfile.value.t_books.map(async (book) => {
          if (book.coverImage) {
            book.coverImage = await bookService.bufferToBase64(book.coverImage)
          }
          // Par défaut, considérons qu'un livre a été lu s'il a une note moyenne (à ajuster selon votre logique métier)
          // Ou si l'attribut isRead est défini à true
          book.isRead = book.isRead || book.avg > 0
          return book
        }),
      )
    }
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error)
    errorMessage.value = 'Impossible de charger les données du profil'
  } finally {
    isLoading.value = false
  }
})

// Navigation vers la page de détail d'un livre
const goToBook = (id) => {
  router.push({
    name: 'book-detail',
    params: { id },
  })
}

// Changer l'onglet actif
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// Trouver un livre par son ID
const findBookById = (bookId) => {
  // Si l'ID n'est pas dans les livres de l'utilisateur, essayer de le trouver dans t_books du userProfile
  if (userProfile.value && userProfile.value.t_books) {
    // Vérifier si les livres ont des IDs
    if (userProfile.value.t_books.some((book) => book.id)) {
      return userProfile.value.t_books.find((book) => book.id === bookId) || null
    } else {
      // Si aucun livre n'a d'ID, utiliser l'index comme approximation
      // Dans ce cas, on suppose que le book_fk - 1 pourrait correspondre à l'index (à adapter selon votre modèle de données)
      return userProfile.value.t_books[bookId - 1] || null
    }
  }
  return null
}
</script>

<template>
  <div class="profile-view">
    <div class="profile-container">
      <h1 class="page-title">Mon Profil</h1>

      <!-- Loader affiché pendant le chargement -->
      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <p>Chargement de votre profil...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="errorMessage" class="error-container">
        <p>{{ errorMessage }}</p>
        <button @click="$router.push('/')" class="action-button">Retour à l'accueil</button>
      </div>

      <!-- Contenu du profil -->
      <div v-else-if="userProfile" class="profile-content">
        <!-- Informations de l'utilisateur -->
        <div class="profile-info">
          <div class="user-avatar">
            <!-- Avatar par défaut si l'utilisateur n'en a pas -->
            <div class="avatar-placeholder">
              {{ userProfile.username?.charAt(0).toUpperCase() || 'U' }}
            </div>
          </div>
          <div class="user-details">
            <h2>{{ userProfile.username }}</h2>
            <p class="user-email">{{ userProfile.email }}</p>
            <p class="user-status" v-if="userProfile.admin">Administrateur</p>
            <p class="member-since">
              Membre depuis {{ new Date(userProfile.createdAt).toLocaleDateString() }}
            </p>
          </div>
        </div>

        <!-- Statistiques de lecture -->
        <div class="stats-container">
          <div class="stat-card">
            <div class="stat-value">{{ stats.total }}</div>
            <div class="stat-label">Livres</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.read }}</div>
            <div class="stat-label">Lus</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.commented }}</div>
            <div class="stat-label">Commentés</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ stats.averageRating }}</div>
            <div class="stat-label">Note moyenne</div>
          </div>
        </div>

        <!-- Navigation des onglets -->
        <div class="tabs-container">
          <button
            class="tab-button"
            :class="{ active: activeTab === 'all' }"
            @click="setActiveTab('all')"
          >
            Tous mes livres ({{ stats.total }})
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'read' }"
            @click="setActiveTab('read')"
          >
            Livres lus ({{ stats.read }})
          </button>
          <button
            class="tab-button"
            :class="{ active: activeTab === 'commented' }"
            @click="setActiveTab('commented')"
          >
            Livres commentés ({{ stats.commented }})
          </button>
        </div>

        <!-- Section des livres selon le filtre actif -->
        <div class="user-books">
          <div
            v-if="
              filteredBooks.length === 0 && !(activeTab === 'commented' && userComments.length > 0)
            "
            class="no-books"
          >
            <p v-if="activeTab === 'all'">Vous n'avez pas encore ajouté de livres.</p>
            <p v-else-if="activeTab === 'read'">
              Vous n'avez pas encore marqué de livres comme lus.
            </p>
            <p v-else>Vous n'avez pas encore commenté de livres.</p>
            <router-link :to="{ name: 'Book' }" class="action-button">Ajouter un livre</router-link>
          </div>

          <div v-else class="books-grid">
            <div
              v-for="book in filteredBooks"
              :key="book.id"
              class="book-card"
              @click="goToBook(book.id)"
            >
              <div class="book-badges">
                <div v-if="book.isRead" class="book-badge read">Lu</div>
                <div
                  v-if="userComments.some((c) => c.book_fk === book.id)"
                  class="book-badge commented"
                >
                  Commenté
                </div>
              </div>
              <div class="book-cover-container">
                <template v-if="book.coverImage">
                  <img :src="book.coverImage" :alt="book.name" class="cover-image" />
                </template>
                <template v-else>
                  <Skeleton class="skeleton-cover" />
                </template>
              </div>
              <div class="book-info">
                <h4 class="book-title">{{ book.name }}</h4>
                <BaseRating
                  v-if="book.avg"
                  :modelValue="book.avg"
                  :readonly="true"
                  class="book-rating"
                />
                <p class="book-category" v-if="book.t_category">{{ book.t_category.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section des commentaires (visible uniquement dans l'onglet commentés) -->
        <div v-if="activeTab === 'commented' && userComments.length > 0" class="comments-section">
          <h3>Mes commentaires</h3>
          <div class="comments-list">
            <div v-for="comment in userComments" :key="comment.id" class="comment-card">
              <div class="comment-header">
                <h4>{{ findBookById(comment.book_fk)?.name || 'Livre inconnu' }}</h4>
                <BaseRating :modelValue="comment.note" :readonly="true" class="comment-rating" />
                <span class="comment-date">{{
                  new Date(comment.createdAt).toLocaleDateString()
                }}</span>
              </div>
              <p class="comment-text">{{ comment.message || comment.text || '' }}</p>
              <button class="view-book-btn" @click="goToBook(comment.book_fk)">
                Voir le livre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  padding: 2rem;
  min-height: 80vh;
  background-color: #f9f9f9;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.page-title {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

/* Loading styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #6366f1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error message styles */
.error-container {
  background-color: #fee2e2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.action-button {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
}

.action-button:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.2);
}

/* Profile info styles */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ddd;
}

.user-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: white;
  font-weight: bold;
}

.user-details {
  flex-grow: 1;
}

.user-details h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.user-email {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.user-status {
  background-color: #8b5cf6;
  color: white;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.member-since {
  color: #6c757d;
  font-size: 0.875rem;
}

/* Stats section styles */
.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
}

/* Tabs navigation */
.tabs-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
  justify-content: center;
}

.tab-button {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.tab-button:hover {
  background-color: #f3f4f6;
  color: #2c3e50;
}

.tab-button.active {
  background-color: #6366f1;
  color: white;
}

/* Books section styles */
.user-books {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-books h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.user-books h3 span {
  font-size: 1rem;
  color: #6c757d;
  margin-left: 0.5rem;
}

.no-books {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.books-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  max-width: 1200px;
}

.book-card {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 1.5rem;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-badges {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.book-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
}

.book-badge.read {
  background-color: #10b981;
}

.book-badge.commented {
  background-color: #3b82f6;
}

.book-cover-container {
  height: 300px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.75rem;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f3f4f6;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #6c757d;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.book-title {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.8rem;
}

.book-rating {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.book-category {
  color: #6c757d;
  font-size: 0.875rem;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Comments section styles */
.comments-section {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.comments-section h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 1.5rem;
  text-align: center;
}

.comments-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.comment-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 350px;
}

.comment-card:hover {
  transform: translateY(-3px);
}

.comment-header {
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
}

.comment-header h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.comment-rating {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.comment-date {
  font-size: 0.875rem;
  color: #6c757d;
  display: block;
  text-align: center;
}

.comment-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.view-book-btn {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.view-book-btn:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
}

/* Responsive styles */
@media (max-width: 768px) {
  .profile-view {
    padding: 1rem;
  }

  .profile-container {
    padding: 1.5rem;
  }

  .profile-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .tabs-container {
    flex-direction: column;
    gap: 0.5rem;
  }

  .book-card {
    width: 150px;
  }

  .book-cover-container {
    height: 225px;
  }

  .book-badge {
    top: 10px;
  }

  .book-badge.commented {
    top: 40px;
  }

  .comment-card {
    width: 100%;
  }
}

.skeleton-cover {
  width: 100% !important;
  height: 100% !important;
  border-radius: 8px;
  background: #e9ecef;
}
</style>
