import axios from "axios";
import {useAuthStore} from "@/stores/auth.store";

const axiosClient = axios.create({
    baseURL: 'http://plabzou-api.test/api'
})

axiosClient.interceptors.request.use(config => {
    const authStore = useAuthStore()

    if (authStore.token) {
        config.headers['Authorization'] = authStore.token
    }

    return config
})

export default axiosClient
