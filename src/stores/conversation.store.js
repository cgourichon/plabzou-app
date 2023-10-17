import {defineStore} from "pinia";
import axiosClient from "@/axios";
import {useAuthStore} from "@/stores/auth.store";

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        conversation: null,
    }),
    actions: {
        /*
        async fetchConversation(id) {
            const response = await axiosClient.get(`/conversations/${id}`)
            if (response) this.conversation = response.data.data
        },*/
        async sendMessage(data) {
            const response = await axiosClient.post(`/messages`, data)
            if (response) await useAuthStore().fetchAuthenticatedUser();
        }
    }
})
