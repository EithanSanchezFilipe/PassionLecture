import { ref, computed, onMounted } from 'vue'
import categoryService from '@/services/categoryService'

export function useCategoryBooks() {
  const categories = ref([])
  const booksByCategory = ref({})
  const searchTerm = ref('')

  // Récupère catégories et livres associés
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
      console.error('Erreur fetching categories/books:', err)
    }
  })

  // Computed pour filtrer les livres par catégorie et terme de recherche
  const filteredBooksByCategory = computed(() => {
    const filtered = {}

    for (const cat of categories.value) {
      const allBooks = booksByCategory.value[cat.id] || []
      filtered[cat.id] = allBooks.filter((book) =>
        book.name?.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )
    }

    return filtered
  })

  return {
    categories,
    filteredBooksByCategory,
  }
}
