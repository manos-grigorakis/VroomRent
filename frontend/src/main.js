import '@/assets/main.css'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'
import 'boxicons'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import BaseButton from './components/ui/BaseButton.vue'
import AccentButton from './components/ui/AccentButton.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseModal from './components/ui/BaseModal.vue'
import BaseWrapper from './components/ui/BaseWrapper.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Toast)

// Global Components
app
  .component('BaseButton', BaseButton)
  .component('AccentButton', AccentButton)
  .component('BaseSpinner', BaseSpinner)
  .component('BaseModal', BaseModal)
  .component('BaseWrapper', BaseWrapper)

app.mount('#app')
