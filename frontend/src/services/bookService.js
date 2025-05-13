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
    return apiClient.post('/book', book)
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
