import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useRoomStore = defineStore('room', {
    state: () => ({
        rooms: [],
        room: null,
    }),
    actions: {
        async fetchRooms() {
            const response = await axiosClient.get('/rooms')
            if (response) this.rooms = response.data.data
        },
        async fetchRoom(id) {
            const response = await axiosClient.get(`/rooms/${id}`)
            if (response) this.room = response.data.data
        },
        async createRoom(room) {
            await axiosClient.post('/rooms', room)
        },
        async updateRoom(id, room) {
            await axiosClient.put(`/rooms/${id}`, room)
        },
        async deleteRoom(id) {
            await axiosClient.delete(`/rooms/${id}`)
        },
        resetRoom() {
            this.room = null
        },
        resetRooms() {
            this.rooms = null
        }
    }
})
