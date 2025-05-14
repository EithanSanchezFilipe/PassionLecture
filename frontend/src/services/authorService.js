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
  create(author) {
    return apiClient.post('/author', author)
  },
  delete(id) {
    return apiClient.post('/author' + id)
  },
  getBooksByAuthor(id) {
    return apiClient.get('/author/' + id + '/books')
  },
}
