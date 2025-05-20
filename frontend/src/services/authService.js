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
  login(user) {
    return apiClient.post('/user/login', user)
  },
  register(user) {
    return apiClient.post('/user/register', user)
  },
  validateToken() {
    return apiClient.get('/user/validateToken')
  },
  logout() {
    console.log('Logout')
    return apiClient.post('/user/logout')
  },
}
