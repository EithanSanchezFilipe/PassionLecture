import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:443/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getBooks() {
    return apiClient.get('/book')
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
  bufferToBase64(buffer) {
    return 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(buffer.data)))
  },
}
