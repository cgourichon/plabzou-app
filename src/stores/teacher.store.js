import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useTeacherStore = defineStore('teacher', {
    state: () => ({
        teacher: null,
        teachers: [],
        teacher_statuses: [],
    }),
    actions: {
        async fetchTeachers() {
            const response = await axiosClient.get('/teachers')
            if (response) this.teachers = response.data.data
        },
        async fetchTeacherStatuses() {
            const response = await axiosClient.get('/statuses')
            if (response) this.teacher_statuses = response.data.data
        },
        resetTeachers() {
            this.teachers = []
        },
        resetTeacher() {
            this.teacher = null
        }
    }
})