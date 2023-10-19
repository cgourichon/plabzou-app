import {defineStore} from "pinia";
import axiosClient from "@/axios";
import {useAuthStore} from "@/stores/auth.store";

export const useConversationStore = defineStore('conversation', {
    state: () => ({
        conversation: null,
    }),
    actions: {

        async sendMessage(data) {
            const response = await axiosClient.post(`/messages`, data)
            if (response) await useAuthStore().fetchAuthenticatedUser();
        },
        async createConversation(data) {
            const response = await axiosClient.post(`/conversations`, data);
            if (response) await useAuthStore().fetchAuthenticatedUser();
        }
    }
})
