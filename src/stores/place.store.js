import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const usePlaceStore = defineStore('place', {
    state: () => ({
        places: [],
        place: null
    }),
    actions: {
        async fetchPlaces() {
            const response = await axiosClient.get('/places')
            if (response) this.places = response.data.data
        },
        async fetchPlace(id) {
            const response = await axiosClient.get(`/places/${id}`)
            if (response) this.place = response.data.data
        },
        async createPlace(place) {
            await axiosClient.post('/places', place)
        },
        async updatePlace(id, place) {
            await axiosClient.put(`/places/${id}`, place)
        },
        async deletePlace(id) {
            await axiosClient.delete(`/places/${id}`)
        },
        resetPlaces() {
            this.places = []
        },
        resetPlace() {
            this.place = null
        }
    }
})
