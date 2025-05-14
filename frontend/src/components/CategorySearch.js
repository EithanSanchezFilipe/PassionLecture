import { ref, computed, onMounted } from 'vue'
import categoryService from '@/services/categoryService'

export function useCategorySearch() {
  const categories = ref([])
  const booksByCategory = ref({})
  const searchTerm = ref('')
  const isLoading = ref(true)
  const error = ref(null)

  const loadData = async () => {
    try {
      const catRes = await categoryService.getAllCategory()
      categories.value = catRes.data.categories || []

      if (categories.value.length > 0) {
        await Promise.all(
          categories.value.map(async (cat) => {
            try {
              const res = await categoryService.getBooksByCategory(cat.id)
              booksByCategory.value[cat.id] = res.data.t_books || []
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
