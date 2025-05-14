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
}
