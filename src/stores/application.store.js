import {defineStore} from "pinia";

export const useApplicationStore = defineStore('application', {
    state: () => ({
        loading: false,
        error: null,
        errors: null,
        success: null
    }),
    getters: {
        hasErrors() {
            return this.error !== null || this.errors !== null
        }
    },
    actions: {
        clearErrors() {
            this.error = null
            this.errors = null
        },
        clearSuccess() {
            this.success = null
        }
    }
})
