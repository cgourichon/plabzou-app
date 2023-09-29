import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null
    }),
    actions: {
        async fetchUsers() {
            const response = await axiosClient.get('/users')
            if (response) this.users = response.data.data
        },
        async fetchUser(id) {
            const response = await axiosClient.get(`/users/${id}`)
            if (response) this.user = response.data.data
        }
    }
})
