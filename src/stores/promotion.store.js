import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const usePromotionStore = defineStore('promotion', {
    state: () => ({
        promotions: [],
    }),
    actions: {
        async fetchPromotions() {
            const response = await axiosClient.get('/promotions')
            if (response)  this.promotions = response.data.data
        },
        async createPromotion(promotion) {
            await axiosClient.post('/promotions', promotion)
        },
        resetPromotions() {
            this.promotions = []
        },
    }
})
