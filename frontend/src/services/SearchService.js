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
  search(query = '', searchType = '') {
    return apiClient.get('/search', {
      params: {
        query: query,
        searchType: searchType,
      },
    })
  },
}
