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
        name: term, // ou 'q' ou autre selon ton backend
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
    return 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(buffer.data)))
  },
}
