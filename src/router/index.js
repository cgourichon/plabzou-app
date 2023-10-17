import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {useApplicationStore} from "@/stores/application.store";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import UserListView from "@/views/Management/User/UserListView.vue";
import UserCreateView from "@/views/Management/User/UserCreateView.vue";
import UserEditView from "@/views/Management/User/UserEditView.vue";
import CategoryListView from "@/views/Management/Category/CategoryListView.vue";
import CategoryCreateView from "@/views/Management/Category/CategoryCreateView.vue";
import CategoryEditView from "@/views/Management/Category/CategoryEditView.vue";
import CourseListView from "@/views/Management/Course/CourseListView.vue";
import CourseEditView from "@/views/Management/Course/CourseEditView.vue";
import CourseCreateView from "@/views/Management/Course/CourseCreateView.vue";
import MessagesView from "@/views/MessagesView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/connexion',
            name: 'login',
            component: LoginView
        },
        {
          path: '/messagerie',
          name: '/messagerie',
          component: MessagesView
        },
        {
            path: '/gestion/utilisateurs',
            name: 'users-list',
            component: UserListView
        },
        {
            path: '/gestion/utilisateurs/ajouter',
            name: 'users-create',
            component: UserCreateView
        },
        {
            path: '/gestion/utilisateurs/:id/modifier',
            name: 'users-edit',
            component: UserEditView
        },
        {
            path: '/gestion/categories',
            name: 'categories-list',
            component: CategoryListView
        },
        {
            path: '/gestion/categories/ajouter',
            name: 'categories-create',
            component: CategoryCreateView
        },
        {
            path: '/gestion/categories/:id/modifier',
            name: 'categories-edit',
            component: CategoryEditView
        },
        {
            path: '/gestion/cursus',
            name: 'courses-list',
            component: CourseListView
        },
        {
            path: '/gestion/cursus/ajouter',
            name: 'courses-create',
            component: CourseCreateView
        },
        {
            path: '/gestion/cursus/:id/modifier',
            name: 'courses-edit',
            component: CourseEditView
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()
    const applicationStore = useApplicationStore()

    authStore.checkTokenExpiration()
    applicationStore.loading = true

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

router.afterEach(async () => {
    const applicationStore = useApplicationStore()

    applicationStore.loading = false
})

export default router
