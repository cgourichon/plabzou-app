import {defineStore} from "pinia";

export const useApplicationStore = defineStore('application', {
    state: () => ({
        loading: false,
        error: null,
        errors: null
    }),
    actions: {
        clearErrors() {
            this.error = null
            this.errors = null
        }
    }
})
