import { ref, onMounted, computed } from 'vue'
import categoryService from '@/services/categoryService'

export function useCategoryBooks() {
  const categories = ref([])
  const booksByCategory = ref({})
  const searchTerm = ref('')

  // 1. Récupère catégories et livres associés
  const fetchData = async () => {
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
      console.error('Erreur fetching categories/books:', err)
    }
  }

  // 2. Mise à jour du terme de recherche
  const onSearch = (term) => {
    searchTerm.value = term.toLowerCase()
  }
  const filteredBooksByCategory = computed(() => {
    const filtered = {}

    for (const cat of categories.value) {
      const allBooks = booksByCategory.value[cat.id] || []

      filtered[cat.id] = allBooks.filter((book) =>
        book.name?.toLowerCase().includes(searchTerm.value),
      )
    }

    return filtered
  })
  onMounted(fetchData)

  return {
    categories,
    searchTerm,
    onSearch,
    filteredBooksByCategory,
  }
}
