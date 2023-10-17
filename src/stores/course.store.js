import {defineStore} from "pinia";
import axiosClient from "@/axios";

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [],
        course: null,
    }),
    actions: {
        async fetchCourses() {
            const response = await axiosClient.get('/courses')
            if (response) this.courses = response.data.data
        },
        async fetchCourse(id) {
            const response = await axiosClient.get(`/courses/${id}`)
            if (response) this.course = response.data.data
        },
        async createCourse(course) {
            await axiosClient.post('/courses', course)
        },
        async updateCourse(id, course) {
            await axiosClient.put(`/courses/${id}`, course)
        },
        async deleteCourse(id) {
            await axiosClient.delete(`/courses/${id}`)
        },
        resetCourse() {
            this.course = null
        },
        resetCourses() {
            this.courses = []
        }
    }
})
