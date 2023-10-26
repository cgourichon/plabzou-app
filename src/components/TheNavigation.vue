<script setup>
import pbzLogoLarge from '@/assets/images/pbz-logo-large.png'
import {RouterLink} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {computed, onBeforeUpdate, ref} from "vue";
import router from "@/router";

const authStore = useAuthStore()

const authenticatedUser = computed(() => authStore.authenticatedUser);
const pendingRequestsNumber = ref(null);
const getPendingRequests = () => {
    pendingRequestsNumber.value = authStore.authenticatedUser?.teacher?.requests.filter(request => request.is_approved_by_teacher === null).length;
}

const logout = async () => {
  await authStore.logout()
  await router.push('/connexion')
}

onBeforeUpdate(() => {
    getPendingRequests();
})
</script>

<template>
  <nord-navigation slot="nav">
    <nord-dropdown slot="header" expand align="start" position="block-end" size="m">
      <nord-button class="n-logo has-logo" slot="toggle" expand aria-haspopup="true" variant="default" type="submit"
                   size="m" aria-expanded="false" href="#">
        <div slot="start" aria-hidden="true" class="n-clinic-img"
             :style="`background-image: url(${pbzLogoLarge})`"></div>
      </nord-button>
    </nord-dropdown>

    <nord-nav-group heading="Global">
      <RouterLink to="/">
        <nord-nav-item :active="$route.path === '/'" icon="interface-home">
          Accueil
        </nord-nav-item>
      </RouterLink>

      <RouterLink v-if="!!authenticatedUser?.administrative_employee" to="/planning/promotions">
        <nord-nav-item :active="$route.path.startsWith('/planning/promotions')" icon="interface-calendar">
          Planning
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>

    <nord-nav-group v-if="!!authenticatedUser?.administrative_employee" heading="Gestion">
      <RouterLink to="/gestion/categories">
        <nord-nav-item :active="$route.path.startsWith('/gestion/categories')" icon="interface-grid">
          Catégories
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/formations">
        <nord-nav-item :active="$route.path.startsWith('/gestion/formations')" icon="interface-grid">
          Formations
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/cursus">
        <nord-nav-item :active="$route.path.startsWith('/gestion/cursus')" icon="interface-grid">
          Cursus
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/promotions">
        <nord-nav-item :active="$route.path.startsWith('/gestion/promotions')" icon="interface-grid">
          Promotions
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/creneaux">
        <nord-nav-item :active="$route.path.startsWith('/gestion/creneaux')" icon="interface-grid">
          Créneaux
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/demandes">
        <nord-nav-item :active="$route.path.startsWith('/gestion/demandes')" icon="interface-grid">
          Demandes
        </nord-nav-item>
      </RouterLink>

      <nord-nav-item :active="$route.path.startsWith('/gestion/salles')" icon="generic-company">
        Localisation

        <nord-nav-group slot="subnav">
          <RouterLink to="/gestion/batiments">
            <nord-nav-item :active="$route.path.startsWith('/gestion/batiments')" icon="interface-grid">
              Salles
            </nord-nav-item>
          </RouterLink>

          <RouterLink to="/gestion/batiments">
            <nord-nav-item :active="$route.path.startsWith('/gestion/batiments')" icon="interface-grid">
              Bâtiments
            </nord-nav-item>
          </RouterLink>

          <RouterLink to="/gestion/lieux">
            <nord-nav-item :active="$route.path.startsWith('/gestion/lieux')" icon="interface-grid">
              Lieux
            </nord-nav-item>
          </RouterLink>

          <RouterLink to="/gestion/villes">
            <nord-nav-item :active="$route.path.startsWith('/gestion/villes')" icon="interface-grid">
              Villes
            </nord-nav-item>
          </RouterLink>
        </nord-nav-group>
      </nord-nav-item>
    </nord-nav-group>

    <nord-nav-group v-if="!!authenticatedUser?.administrative_employee" heading="Panel d'administration">
      <RouterLink to="/gestion/utilisateurs">
        <nord-nav-item :active="$route.path.startsWith('/gestion/utilisateurs')" icon="user-multiple">
          Utilisateurs
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/gestion/imports">
        <nord-nav-item :active="$route.path.startsWith('/gestion/imports')" icon="interface-upload">
          Imports
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>

    <nord-nav-group
        v-if="authStore.authenticatedUser?.teacher || authStore.authenticatedUser?.administrative_employee"
        heading="Communication"
    >
      <RouterLink to="/messagerie">
        <nord-nav-item :active="$route.path === '/messagerie'" icon="generic-mail">
          Messages
        </nord-nav-item>
      </RouterLink>
      <RouterLink v-if="!!authenticatedUser?.teacher" to="/mes-demandes">
        <nord-nav-item :active="$route.path === '/mes-demandes'" icon="interface-help">
            <nord-stack direction="horizontal" justify-content="space-between" :class="$route.path === '/mes-demandes' ? 'n-color-text-on-accent' : ''">
                Demandes
                <nord-badge v-if="pendingRequestsNumber > 0" variant="highlight">{{pendingRequestsNumber}}</nord-badge>
            </nord-stack>
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>

    <nord-nav-group v-if="authenticatedUser === null" slot="footer" heading="Authentification">
      <RouterLink to="/connexion">
        <nord-nav-item :active="$route.path === '/connexion'" icon="interface-login">
          Connexion
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>

    <nord-dropdown v-else slot="footer" expand>
      <nord-button slot="toggle" expand>
        <nord-avatar slot="start" aria-hidden="true" name="Prénom NOM"></nord-avatar>
        {{ authenticatedUser?.first_name }} {{ authenticatedUser?.last_name }}
      </nord-button>

      <nord-dropdown-group>
        <RouterLink to="/profil">
          <nord-dropdown-item>Profil</nord-dropdown-item>
        </RouterLink>
      </nord-dropdown-group>

      <nord-dropdown-group>
        <a href="https://bibz-tec.atlassian.net/servicedesk/" target="_blank">
          <nord-dropdown-item>Aide & Support</nord-dropdown-item>
        </a>
      </nord-dropdown-group>

      <nord-dropdown-item @click.prevent="logout">
        Déconnexion
        <nord-icon slot="end" name="interface-logout"></nord-icon>
      </nord-dropdown-item>
    </nord-dropdown>
  </nord-navigation>
</template>
<style scoped>
</style>