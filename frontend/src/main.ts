import 'uno.css'
import '@unocss/reset/normalize.css'
import '@unocss/reset/eric-meyer.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

// #TODO: https on preview
