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
  getAllCategory() {
    return apiClient.get(`/category`)
  },
  getBooksByCategory(categoryId) {
    return apiClient.get(`/category/${categoryId}/books`)
  },
}
