import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useLearnerStore = defineStore('learner', {
    state: () => ({
        learner: null,
        learners: [],
        learner_modes: []
    }),
    actions: {
        async fetchLearners(parameters = null) {
            const response = await axiosClient.get('/learners', {params: parameters})
            if (response) this.learners = response.data.data
        },
        async fetchLearner(id) {
            const response = await axiosClient.get(`/learners/${id}`)
            if (response) this.learner = response.data.data
        },
        async fetchLearnerModes() {
            const response = await axiosClient.get('/modes')
            if (response) this.learner_modes = response.data.data
        },
        resetLearners() {
            this.learners = []
        },
        resetLearner() {
            this.learner = null
        }
    }
})