import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useTimeslotStore = defineStore('timeslot', {
    state: () => ({
        timeslots: [],
        timeslot: null,
    }),
    actions: {
        async fetchTimeslots() {
            const response = await axiosClient.get('/timeslots')
            if (response) this.timeslots = response.data.data
        },
        async fetchTimeslot(id) {
            const response = await axiosClient.get(`/timeslots/${id}`)
            if (response) this.timeslot = response.data.data
        },
        async createTimeslot(timeslot) {
            await axiosClient.post('/timeslots', timeslot)
        },
        async updateTimeslot(id, timeslot) {
            await axiosClient.put(`/timeslots/${id}`, timeslot)
        },
        async deleteTimeslot(id) {
            await axiosClient.delete(`/timeslots/${id}`)
        },
        resetTimeslot() {
            this.timeslot = null
        },
        resetTimeslots() {
            this.timeslots = []
        }
    }
})
