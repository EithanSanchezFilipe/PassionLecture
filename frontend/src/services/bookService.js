import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
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
}
