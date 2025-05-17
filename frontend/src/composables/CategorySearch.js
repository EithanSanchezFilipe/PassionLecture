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

  const loadData = async () => {
    try {

      const catRes = await categoryService.getAllCategory()
      categories.value = catRes.data.categories || []

      if (categories.value.length > 0) {
        await Promise.all(
          categories.value.map(async (cat) => {
            try {
              const res = await categoryService.getBooksByCategory(cat.id)
              const books = res.data.t_books || []
              
              // Convertir les images en base64
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
