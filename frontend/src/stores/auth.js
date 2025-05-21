import { defineStore } from 'pinia'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: null,
  }),
  actions: {
    async Login(data) {
      const response = await authService.login(data)
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
      return response
    },
    async Register(data) {
      const response = await authService.register(data)
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true')
      return response
    },
    initAuth() {
      // Check if the token is valid
      authService
        .validateToken()
        .then((response) => {
          if (response.status == 200) {
            this.isAuthenticated = true
            localStorage.setItem('isAuthenticated', 'true')
            // Also load user profile if needed
            return authService
              .getProfile()
              .then((profileResponse) => {
                if (profileResponse.data && profileResponse.data.user) {
                  this.user = profileResponse.data.user
                }
              })
              .catch((error) => {
                console.error('Error fetching profile:', error)
              })
          } else {
            this.isAuthenticated = false
            localStorage.removeItem('isAuthenticated')
          }
        })
        .catch((err) => {
          console.error(err)
          this.isAuthenticated = false
          localStorage.removeItem('isAuthenticated')
        })
    },
    async Logout() {
      const response = await authService.logout()
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('isAuthenticated')
      return response
    },
    Authorize() {
      if (this.isAuthenticated) {
        return
      } else {
        // Check if token is valid before redirecting
        authService
          .validateToken()
          .then((response) => {
            if (response.status === 200) {
              this.isAuthenticated = true
              localStorage.setItem('isAuthenticated', 'true')
            } else {
              router.push({ name: 'Login' })
            }
          })
          .catch(() => {
            router.push({ name: 'Login' })
          })
      }
    },
  },
})
