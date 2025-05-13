import { ref, computed, onMounted } from 'vue'
import categoryService from '@/services/categoryService'

export function useCategorySearch() {
  const categories = ref([])
  const booksByCategory = ref({})
  const searchTerm = ref('')

  onMounted(async () => {
    try {
      const catRes = await categoryService.getAllCategory()
      categories.value = catRes.data.categories

      await Promise.all(
        categories.value.map(async (cat) => {
          const res = await categoryService.getBooksByCategory(cat.id)
          booksByCategory.value[cat.id] = res.data.t_books || []
        }),
      )
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err)
    }
  })

  const filteredCategories = computed(() => {
    return categories.value.filter((cat) =>
      cat.name?.toLowerCase().includes(searchTerm.value.toLowerCase()),
    )
  })

  return {
    categories,
    booksByCategory,
    searchTerm,
    filteredCategories,
  }
}
