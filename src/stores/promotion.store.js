import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const usePromotionStore = defineStore('promotion', {
    state: () => ({
        promotions: [],
        promotion: null,
    }),
    actions: {
        async fetchPromotions() {
            const response = await axiosClient.get('/promotions')
            if (response)  this.promotions = response.data.data
        },
        async fetchPromotion(id) {
            const response = await axiosClient.get(`/promotions/${id}`)
            if (response) this.promotion = response.data.data
        },
        async createPromotion(promotion) {
            await axiosClient.post(`/promotions`, promotion)
        },
        async updatePromotion(id, promotion) {
            await axiosClient.put(`/promotions/${id}`, promotion)
        },
        async deletePromotion(id) {
            await axiosClient.delete(`/promotions/${id}`)
        },
        resetPromotions() {
            this.promotions = []
        },
        resetPromotion() {
            this.promotion = null
        },
    }
})
