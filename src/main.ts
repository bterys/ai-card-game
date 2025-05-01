import { createApp } from 'vue'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import 'vfonts/Lato.css' // General fonts
import 'vfonts/FiraCode.css' // Monospace fonts

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(naive)
app.use(pinia)

app.mount('#app')
