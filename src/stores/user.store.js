import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null,
        learners: [],
        teachers: [],
        teacher_statuses: [],
        learner_modes: []
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
        async fetchLearners() {
            const response = await axiosClient.get('/learners')
            if (response) this.learners = response.data.data
        },
        async fetchTeachers() {
            const response = await axiosClient.get('/teachers')
            if (response) this.teachers = response.data.data
        },
        async fetchTeacherStatuses() {
            const response = await axiosClient.get('/statuses')
            if (response) this.teacher_statuses = response.data.data
        },
        async fetchLearnerModes() {
            const response = await axiosClient.get('/modes')
            if (response) this.learner_modes = response.data.data
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
        resetUser() {
            this.user = null
        },
        resetUsers() {
            this.users = []
        }
    }
})
