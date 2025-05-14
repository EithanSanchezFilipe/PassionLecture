import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Paginator from 'primevue/paginator'
import ProgressSpinner from 'primevue/progressspinner'
import Steps from 'primevue/steps'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.component('PrimeDialog', Dialog)
app.component('PrimePaginator', Paginator)
app.component('ProgressSpinner', ProgressSpinner)
app.component('PrimeSteps', Steps)

app.mount('#app')
