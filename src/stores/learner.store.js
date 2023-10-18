import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useLearnerStore = defineStore('learner', {
    state: () => ({
        learner: null,
        learners: [],
        learner_modes: []
    }),
    actions: {
        async fetchLearners() {
            const response = await axiosClient.get('/learners')
            if (response) this.learners = response.data.data
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