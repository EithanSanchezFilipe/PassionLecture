import { defineStore } from 'pinia'
import authService from '@/services/authService'
import Cookies from 'js-cookie'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async Login(data) {
      const response = await authService.login(data)
      this.isAuthenticated = true
      return response
    },
    async Register(data) {
      const response = await authService.register(data)
      this.isAuthenticated = true
      return response
    },
    initAuth() {
      authService
        .validateToken()
        .then((response) => {
          if (response.status == 200) {
            return (this.isAuthenticated = true)
          }
          return (this.isAuthenticated = false)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async Logout() {
      const response = await authService.logout()
      this.isAuthenticated = false
      return response
    },
  },
})
