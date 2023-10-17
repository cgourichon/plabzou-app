import "@nordhealth/components"
import "@nordhealth/css"
import "./assets/styles/theme.scss"
import "vue-multiselect/dist/vue-multiselect"

import {createApp} from "vue"
import {createPinia} from "pinia"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
