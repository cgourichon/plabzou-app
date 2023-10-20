import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useRequestStore = defineStore('request', {
    state: () => ({
        requests: [],
        request: null
    }),
    actions: {
        async fetchRequests() {
            const response = await axiosClient.get('/requests')
            if (response) this.requests = response.data.data
        },
        async fetchRequest(id) {
            const response = await axiosClient.get(`/requests/${id}`)
            if (response) this.request = response.data.data
        },
        async createRequest(request) {
            await axiosClient.post('/requests', request);
        },
        async updateRequest(id, data) {
            await axiosClient.put(`requests/${id}`, data)
        },
        async deleteRequest(id) {
            await axiosClient.delete(`requests/${id}`)
        },
        clearRequest() {
            this.request = null;
        }
    }
})