import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import categoryService from '@/services/categoryService'
import bookService from '@/services/bookService'

export function useCategorySearch() {
  const categories = ref([])
  const booksByCategory = ref({})
  const searchTerm = ref('')
  const isLoading = ref(true)
  const error = ref(null)
  const createdUrls = ref([])

  const convertBlobToUrl = (blob) => {
    if (!blob) return null
    const url = URL.createObjectURL(new Blob([blob], { type: 'image/jpeg' }))
    createdUrls.value.push(url)
    return url
  }

  const cleanupUrls = () => {
    createdUrls.value.forEach(url => {
      URL.revokeObjectURL(url)
    })
    createdUrls.value = []
  }

  const loadData = async () => {
    try {
      // Nettoyer les anciennes URLs avant de charger de nouvelles données
      cleanupUrls()
      
      const catRes = await categoryService.getAllCategory()
      categories.value = catRes.data.categories || []

      if (categories.value.length > 0) {
        await Promise.all(
          categories.value.map(async (cat) => {
            try {
              const res = await categoryService.getBooksByCategory(cat.id)
              const books = res.data.t_books || []
              
              // Convertir les images en base64 comme dans HomeView
              const processedBooks = await Promise.all(
                books.map(async (book) => {
                  if (book.coverImage) {
                    book.coverImage = await bookService.bufferToBase64(book.coverImage)
                  }
                  return book
                })
              )
              
              booksByCategory.value[cat.id] = processedBooks
            } catch (err) {
              console.error(`Error loading books for category ${cat.id}:`, err)
              booksByCategory.value[cat.id] = []
            }
          }),
        )
      }
    } catch (err) {
      console.error('Error loading categories:', err)
      error.value = 'Erreur lors du chargement des catégories'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadData()
  })

  onBeforeUnmount(() => {
    cleanupUrls()
  })

  const filteredCategories = computed(() => {
    if (!categories.value) return []
    return categories.value.filter((cat) =>
      cat.name?.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  })

  return {
    categories,
    booksByCategory,
    searchTerm,
    filteredCategories,
    isLoading,
    error,
  }
}
