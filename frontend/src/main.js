import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import { boxicons } from 'boxicons'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(boxicons)

app.mount('#app')
