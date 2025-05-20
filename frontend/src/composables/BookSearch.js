import { ref, computed, onMounted } from 'vue'
import SearchService from '@/services/SearchService'
import bookService from '@/services/bookService'

export function useBookSearch() {
  const books = ref([])
  const searchTerm = ref('')
  const isLoading = ref(true)
  const error = ref(null)
  
  const loadBooks = async (query = '') => {
    if (!query) {
      books.value = []
      isLoading.value = false
      return
    }

    try {
      isLoading.value = true
      const res = await SearchService.search(query, 'book')
      const resultsData = res.data || []
      
      // Convertir les images en base64 comme dans CategorySearch
      const processedBooks = await Promise.all(
        resultsData.map(async (book) => {
          const processedBook = { ...book }
          if (book.coverImage) {
            try {
              processedBook.coverImage = await bookService.bufferToBase64(book.coverImage)
            } catch (e) {
              console.warn('Erreur lors de la conversion de l\'image:', e)
              processedBook.coverImage = null
            }
          }
          return processedBook
        })
      )
      
      books.value = processedBooks
      console.log('Livres chargés:', books.value.length)
    } catch (err) {
      console.error('Erreur lors de la recherche de livres:', err)
      error.value = 'Erreur lors de la recherche des livres'
      books.value = []
    } finally {
      isLoading.value = false
    }
  }
  
  const getAuthorName = (book) => {
    console.log('Structure complète du livre:', book);
    console.log('Type de book.t_author:', typeof book.t_author, book.t_author);
    console.log('Type de book.author:', typeof book.author, book.author);
    
    // Gestion flexible de la structure d'auteur
    if (book.t_author && book.t_author.firstname && book.t_author.lastname) {
      console.log('MATCH: Utilisation de t_author', book.t_author.firstname, book.t_author.lastname);
      return `${book.t_author.firstname} ${book.t_author.lastname}`
    }
    
    if (book.author && book.author.firstname && book.author.lastname) {
      console.log('MATCH: Utilisation de author', book.author.firstname, book.author.lastname);
      return `${book.author.firstname} ${book.author.lastname}`
    }
    
    if (book.authorName) {
      console.log('MATCH: Utilisation de authorName', book.authorName);
      return book.authorName;
    }
    
    if (typeof book.author === 'string') {
      console.log('MATCH: author est une chaîne', book.author);
      return book.author;
    }
    
    const fields = ['author_firstname', 'author_lastname', 'author_name'];
    for (const field of fields) {
      if (book[field]) {
        console.log(`MATCH: Utilisation de ${field}`, book[field]);
        return book[field];
      }
    }
    
    console.log('ECHEC: Aucune correspondance trouvée pour l\'auteur, retour "Auteur inconnu"');
    return 'Auteur inconnu'
  }

  const filteredBooks = computed(() => {
    return books.value
  })

  return {
    books,
    searchTerm,
    filteredBooks,
    isLoading,
    error,
    loadBooks,
    getAuthorName
  }
}
