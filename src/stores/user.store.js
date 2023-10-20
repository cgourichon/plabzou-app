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
        },
        async createUser(user) {
            await axiosClient.post('/users', user)
        },
        async updateUser(id, user) {
            await axiosClient.put(`/users/${id}`, user)
        },
        async deleteUser(id) {
            await axiosClient.delete(`/users/${id}`)
        },
        async updateCurrent(user) {
            await axiosClient.patch('/users/me', user)
        },
        resetUser() {
            this.user = null
        },
        resetUsers() {
            this.users = []
        }
    }
})
