import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'
import Steps from 'primevue/steps'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none', // Force le mode clair par défaut
      cssLayer: false,
      cssVariables: true,
    },
  },
})
app.use(pinia)
app.use(router)

app.component('PrimeDialog', Dialog)
app.component('PrimePaginator', Paginator)
app.component('ProgressSpinner', ProgressSpinner)
app.component('PrimeSteps', Steps)

const GStore = reactive({ flashMessage: '', isSuccess: true })
app.provide('GStore', GStore)

app.mount('#app')
