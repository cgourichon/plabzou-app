import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useTrainingStore = defineStore('training', {
    state: () => ({
        trainings: [],
        training: null,
    }),
    actions: {
        async fetchTrainings() {
            const response = await axiosClient.get('/trainings')
            if (response) this.trainings = response.data.data
        },
        async fetchTraining(id) {
            const response = await axiosClient.get(`/trainings/${id}`)
            if (response) this.training = response.data.data
        },
        async createTraining(training) {
            await axiosClient.post('/trainings', training)
        },
        async updateTraining(id, training) {
            await axiosClient.put(`/trainings/${id}`, training)
        },
        async deleteTraining(id) {
            await axiosClient.delete(`/trainings/${id}`)
        },
        resetTraining() {
            this.training = null
        },
        resetTrainings() {
            this.trainings = []
        }
    }
})
