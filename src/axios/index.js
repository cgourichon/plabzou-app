import axios from "axios";
import {useAuthStore} from "@/stores/auth.store";
import {useApplicationStore} from "@/stores/application.store";

const axiosClient = axios.create({
    baseURL: 'http://plabzou-api.test/api'
})

axiosClient.interceptors.request.use(config => {
    const authStore = useAuthStore()
    const applicationStore = useApplicationStore()

    applicationStore.loading = true

    if (authStore.token) {
        config.headers['Authorization'] = authStore.token
    }

    return config
})

axiosClient.interceptors.response.use(response => {
    const applicationStore = useApplicationStore()

    applicationStore.loading = false

    applicationStore.clearSuccess()
    if(response.config.method !== 'get') applicationStore.success = response.data.message

    applicationStore.clearErrors()

    return response
}, error => {
    const applicationStore = useApplicationStore()

    applicationStore.loading = false

    applicationStore.error = error?.response?.data?.message
    applicationStore.errors = error?.response?.data?.errors
})

export default axiosClient
