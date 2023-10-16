import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        category: null,
    }),
    actions: {
        async fetchCategories() {
            const response = await axiosClient.get('/categories')
            if (response) this.categories = response.data.data
        },
        async fetchCategory(id) {
            const response = await axiosClient.get(`/categories/${id}`)
            if (response) this.category = response.data.data
        },
        async createCategory(category) {
            await axiosClient.post('/categories', category)
        },
        async updateCategory(id, category) {
            await axiosClient.put(`/categories/${id}`, category)
        },
        async deleteCategory(id) {
            await axiosClient.delete(`/categories/${id}`)
        },
        resetCategory() {
            this.category = null
        },
        resetCategories() {
            this.categories = []
        }
    }
})
