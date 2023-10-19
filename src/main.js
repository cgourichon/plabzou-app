import "@nordhealth/components"
import "@nordhealth/css"
import "@nordhealth/icons"

import "./assets/styles/theme.scss"
import "vue-multiselect/dist/vue-multiselect.css"
import "./assets/styles/multiselect.css"
import "./assets/styles/fullcalendar.css"
import "ag-grid-community/styles/ag-grid.css";
import "@nordhealth/ag-theme-nord";

import {createApp} from "vue"
import {createPinia} from "pinia"
import {Multiselect} from "vue-multiselect"

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('multi-select', Multiselect);

app.mount('#app')
