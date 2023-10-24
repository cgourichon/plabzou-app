import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useCityStore = defineStore('city', {
    state: () => ({
        cities: [],
        city: null
    }),
    actions: {
        async fetchCities() {
            const response = await axiosClient.get('/cities')
            if (response) this.cities = response.data.data
        },
        async fetchCity(id) {
            const response = await axiosClient.get(`/cities/${id}`)
            if (response) this.city = response.data.data
        },
        async createCity(city) {
            await axiosClient.post('/cities', city)
        },
        async updateCity(id, city) {
            await axiosClient.put(`/cities/${id}`, city)
        },
        async deleteCity(id) {
            await axiosClient.delete(`/cities/${id}`)
        },
        resetCities() {
            this.cities = []
        },
        resetCity() {
            this.city = null
        }
    }
})
