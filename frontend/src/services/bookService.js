import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:443/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
export default {
  getBooks(term = '') {
    return apiClient.get('/book', {
      params: {
        name: term,
      },
    })
  },
  getBook(id) {
    return apiClient.get('/book/' + id)
  },
  addBook(book) {
    const formData = new FormData()
    formData.append('name', book.name)
    formData.append('passage', book.passage || '')
    formData.append('summary', book.summary)
    formData.append('editionYear', book.editionYear)
    formData.append('pages', book.pages)
    formData.append('category_fk', book.category_fk)
    if (book.coverImage) {
      formData.append('coverImage', book.coverImage)
    }

    return apiClient.post('/book', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  deleteBook(id) {
    return apiClient.delete(`/book/${id}`)
  },
  updateBook(id, bookData) {
    const formData = new FormData()

    // Add basic fields
    formData.append('name', bookData.name)
    formData.append('passage', bookData.passage || '')
    formData.append('summary', bookData.summary)
    formData.append('editionYear', bookData.editionYear)
    formData.append('pages', bookData.pages)
    formData.append('category_fk', bookData.category_fk)

    // Only append coverImage if it's a File object
    if (bookData.coverImage && bookData.coverImage instanceof File) {
      formData.append('coverImage', bookData.coverImage)
    }

    return apiClient.put(`/book/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getLatestBooks() {
    return apiClient.get('/book/latest')
  },
  getBookComments(id) {
    return apiClient.get(`/book/${id}/comments`)
  },
  addBookComment(id, comment) {
    return apiClient.post(`/book/${id}/comments`, comment)
  },
  bufferToBase64(buffer) {
    if (!buffer || !buffer.data) return Promise.resolve('')

    const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' })

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  },

  getBooksByUser(userId) {
    return apiClient.get(`/book/user/${userId}`)
  },
}
