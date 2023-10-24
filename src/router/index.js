import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {useApplicationStore} from "@/stores/application.store";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import UserListView from "@/views/Management/User/UserListView.vue";
import UserCreateView from "@/views/Management/User/UserCreateView.vue";
import UserEditView from "@/views/Management/User/UserEditView.vue";
import CategoryListView from "@/views/Management/Category/CategoryListView.vue";
import CategoryCreateView from "@/views/Management/Category/CategoryCreateView.vue";
import CategoryEditView from "@/views/Management/Category/CategoryEditView.vue";
import CityListView from "@/views/Management/City/CityListView.vue";
import CityCreateView from "@/views/Management/City/CityCreateView.vue";
import CityEditView from "@/views/Management/City/CityEditView.vue";
import TrainingListView from "@/views/Management/Training/TrainingListView.vue";
import TrainingCreateView from "@/views/Management/Training/TrainingCreateView.vue";
import TrainingEditView from "@/views/Management/Training/TrainingEditView.vue";
import CourseListView from "@/views/Management/Course/CourseListView.vue";
import CourseEditView from "@/views/Management/Course/CourseEditView.vue";
import CourseCreateView from "@/views/Management/Course/CourseCreateView.vue";
import TimeslotListView from "@/views/Management/Timeslot/TimeslotListView.vue";
import TimeslotCreateView from "@/views/Management/Timeslot/TimeslotCreateView.vue";
import TimeslotEditView from "@/views/Management/Timeslot/TimeslotEditView.vue";
import MessagesView from "@/views/Communication/MessagesView.vue";
import PromotionListView from "@/views/Management/Promotion/PromotionListView.vue";
import PromotionCreateView from "@/views/Management/Promotion/PromotionCreateView.vue";
import PromotionEditView from "@/views/Management/Promotion/PromotionEditView.vue";
import RequestListView from "@/views/Management/Request/RequestListView.vue";
import RequestCreateView from "@/views/Management/Request/RequestCreateView.vue";
import RequestEditView from "@/views/Management/Request/RequestEditView.vue";
import RequestsView from "@/views/Communication/RequestsView.vue";
import PromotionScheduleView from "@/views/Scheduling/AdministrativeScheduleView.vue";
import ImportView from "@/views/Management/Import/ImportView.vue";
import ErrorView from "@/views/ErrorView.vue";
import PlaceListView from "@/views/Management/Place/PlaceListView.vue";
import PlaceCreateView from "@/views/Management/Place/PlaceCreateView.vue";
import PlaceEditView from "@/views/Management/Place/PlaceEditView.vue";
import BuildingListView from "@/views/Management/Building/BuildingListView.vue";
import BuildingCreateView from "@/views/Management/Building/BuildingCreateView.vue";
import BuildingEditView from "@/views/Management/Building/BuildingEditView.vue";
import RoomListView from "@/views/Management/Room/RoomListView.vue";
import RoomCreateView from "@/views/Management/Room/RoomCreateView.vue";
import RoomEditView from "@/views/Management/Room/RoomEditView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/planning/promotions/:id?',
            name: 'schedule-promotions',
            component: PromotionScheduleView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/connexion',
            name: 'login',
            component: LoginView
        },
        {
            path: '/messagerie',
            name: 'messagerie',
            component: MessagesView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee || !!useAuthStore().authenticatedUser?.teacher ? next() : next({name: 'error'})
            }
        },
        {
            path: '/mes-demandes',
            name: 'demandes-teacher',
            component: RequestsView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee || !!useAuthStore().authenticatedUser?.teacher ? next() : next({name: 'error'})
            }
        },
        {
            path: '/profil',
            name: 'profil',
            component: ProfileView
        },
        {
            path: '/gestion/utilisateurs',
            name: 'users-list',
            component: UserListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/utilisateurs/ajouter',
            name: 'users-create',
            component: UserCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/utilisateurs/:id/modifier',
            name: 'users-edit',
            component: UserEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/categories',
            name: 'categories-list',
            component: CategoryListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/categories/ajouter',
            name: 'categories-create',
            component: CategoryCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/categories/:id/modifier',
            name: 'categories-edit',
            component: CategoryEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/villes',
            name: 'cities-list',
            component: CityListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/villes/ajouter',
            name: 'cities-create',
            component: CityCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/villes/:id/modifier',
            name: 'cities-edit',
            component: CityEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/lieux',
            name: 'places-list',
            component: PlaceListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/lieux/ajouter',
            name: 'places-create',
            component: PlaceCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/lieux/:id/modifier',
            name: 'places-edit',
            component: PlaceEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/batiments',
            name: 'buildings-list',
            component: BuildingListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/batiments/ajouter',
            name: 'buildings-create',
            component: BuildingCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/batiments/:id/modifier',
            name: 'buildings-edit',
            component: BuildingEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/salles',
            name: 'rooms-list',
            component: RoomListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/salles/ajouter',
            name: 'rooms-create',
            component: RoomCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/salles/:id/modifier',
            name: 'rooms-edit',
            component: RoomEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/formations',
            name: 'trainings-list',
            component: TrainingListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/formations/ajouter',
            name: 'trainings-create',
            component: TrainingCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/formations/:id/modifier',
            name: 'trainings-edit',
            component: TrainingEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/cursus',
            name: 'courses-list',
            component: CourseListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/cursus/ajouter',
            name: 'courses-create',
            component: CourseCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/cursus/:id/modifier',
            name: 'courses-edit',
            component: CourseEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/creneaux',
            name: 'timeslots-list',
            component: TimeslotListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/creneaux/ajouter',
            name: 'timeslots-create',
            component: TimeslotCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/creneaux/:id/modifier',
            name: 'timeslots-edit',
            component: TimeslotEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/promotions',
            name: 'promotions-list',
            component: PromotionListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/promotions/ajouter',
            name: 'promotions-create',
            component: PromotionCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/promotions/:id/modifier',
            name: 'promotions-edit',
            component: PromotionEditView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/demandes',
            name: 'requests-list',
            component: RequestListView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/demandes/ajouter',
            name: 'requests-create',
            component: RequestCreateView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/gestion/demandes/:id/modifier',
            name: 'requests-edit',
            component: RequestEditView
        },
        {
            path: '/gestion/imports',
            name: 'import-excel',
            component: ImportView,
            beforeEnter: (to, from, next) => {
                !!useAuthStore().authenticatedUser?.administrative_employee ? next() : next({name: 'error'})
            }
        },
        {
            path: '/erreur',
            name: 'error',
            component: ErrorView
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
        if (isAuthenticated) {
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
