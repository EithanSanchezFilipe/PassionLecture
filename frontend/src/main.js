import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(PrimeVue)
app.use(pinia)
app.use(router)

const GStore = reactive({ flashMessage: '', isSuccess: true })
app.provide('GStore', GStore)
app.mount('#app')
app.use(PrimeVue)
