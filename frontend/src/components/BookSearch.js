import { ref, computed, onMounted } from 'vue'
import categoryService from '@/services/categoryService'

export function useBookSearch() {
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
      console.error('Erreur lors du chargement des livres par catégorie:', err)
    }
  })

  const filteredBooksByCategory = computed(() => {
    const result = []

    for (const cat of categories.value) {
      const allBooks = booksByCategory.value[cat.id] || []
      const filteredBooks = allBooks.filter((book) =>
        book.name?.toLowerCase().includes(searchTerm.value.toLowerCase()),
      )

      if (filteredBooks.length > 0) {
        result.push({
          ...cat,
          books: filteredBooks,
        })
      }
    }

    result.sort((a, b) => b.books.length - a.books.length)

    return result
  })

  return {
    categories,
    booksByCategory,
    searchTerm,
    filteredBooksByCategory,
  }
}
