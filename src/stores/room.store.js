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
        }
    }
})
