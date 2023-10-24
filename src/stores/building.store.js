import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useBuildingStore = defineStore('building', {
    state: () => ({
        buildings: [],
        building: null,
    }),
    actions: {
        async fetchBuildings() {
            const response = await axiosClient.get('/buildings')
            if (response) this.buildings = response.data.data
        },
        async fetchBuilding(id) {
            const response = await axiosClient.get(`/buildings/${id}`)
            if (response) this.building = response.data.data
        },
        async createBuilding(building) {
            await axiosClient.post('/buildings', building)
        },
        async updateBuilding(id, building) {
            await axiosClient.put(`/buildings/${id}`, building)
        },
        async deleteBuilding(id) {
            await axiosClient.delete(`/buildings/${id}`)
        },
        resetBuilding() {
            this.building = null
        },
        resetBuildings() {
            this.buildings = []
        }
    }
})
