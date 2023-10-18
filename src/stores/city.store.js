import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useCityStore = defineStore('city', {
    state: () => ({
        cities: [],
    }),
    actions: {
        async fetchCities() {
            const response = await axiosClient.get('/cities')
            if (response) this.cities = response.data.data
        },
        resetCities() {
            this.cities = []
        }
    }
})
