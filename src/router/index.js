import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/connexion',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    authStore.checkTokenExpiration()
    const isAuthenticated = authStore.isAuthenticated

    if (to.name !== 'login' && !isAuthenticated) {
        next({name: 'login'})
    } else {
        if (isAuthenticated && authStore.authenticatedUser === null) {
            await authStore.fetchAuthenticatedUser()
        }

        next()
    }
})

export default router
