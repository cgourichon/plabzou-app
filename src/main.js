import "@nordhealth/components"
import "@nordhealth/css"
import "./assets/styles/theme.scss"

import {createApp} from "vue"
import {createPinia} from "pinia"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
