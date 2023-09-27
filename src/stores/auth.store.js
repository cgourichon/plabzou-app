import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        tokenExpiration: localStorage.getItem('tokenExpiration') || null,
        authenticatedUser: null
    }),
    getters: {
        isAuthenticated() {
            this.checkTokenExpiration()

            return this.token !== null
        }
    },
    actions: {
        async login(credentials) {
            const response = await axiosClient.post('/auth/login', credentials)
            this.setToken(response.data.data.token, response.data.data.expires_at)
        },
        async fetchAuthenticatedUser() {
            const response = await axiosClient.get('/auth/me')
            this.authenticatedUser = response.data.data
        },
        setToken(token, tokenExpiration) {
            this.clearToken()

            this.token = token
            this.tokenExpiration = tokenExpiration

            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpiration', tokenExpiration)
        },
        clearToken() {
            this.token = null
            this.tokenExpiration = null
            this.authenticatedUser = null

            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
        },
        checkTokenExpiration() {
            const now = Math.floor(Date.now() / 1000)

            if (now > this.tokenExpiration) {
                this.clearToken()
            }
        }
    }
})
