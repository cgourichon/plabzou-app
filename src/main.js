import "@nordhealth/components"
import "@nordhealth/css"
import "./assets/styles/theme.scss"
import "vue-multiselect/dist/vue-multiselect.css"
import "./assets/styles/multiselect.css"

import {createApp} from "vue"
import {createPinia} from "pinia"
import {Multiselect} from "vue-multiselect"
//import {Calendar} from "@fullcalendar/core"
//import frLocale from "@fullcalendar/core/locales/fr"

//Calendar.locale = frLocale

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('multi-select', Multiselect);

app.mount('#app')
