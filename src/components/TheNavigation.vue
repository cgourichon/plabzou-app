<script setup>
import {RouterLink} from "vue-router";
import {useAuthStore} from "@/stores/auth.store";
import {computed} from "vue";
import router from "@/router";

const authStore = useAuthStore()

const authenticatedUser = computed(() => authStore.authenticatedUser)

const logout = async () => {
  await authStore.logout()
  await router.push('/connexion')
}
</script>

<template>
  <nord-navigation slot="nav">
    <nord-dropdown slot="header" expand>
      <nord-button slot="toggle" expand>
        <nord-avatar slot="start" name="Plabzou" variant="square">P</nord-avatar>
        Plabzou
      </nord-button>

      <nord-dropdown-group heading="Applications">
        <nord-dropdown-item>
          <nord-avatar slot="start" name="Plabzou" size="s" variant="square">P</nord-avatar>
          Plabzou
          <nord-icon slot="end" name="interface-checked"></nord-icon>
        </nord-dropdown-item>
      </nord-dropdown-group>
    </nord-dropdown>

    <nord-nav-group heading="Global">
      <RouterLink to="/">
        <nord-nav-item :active="$route.path === '/'" icon="interface-home">
          Accueil
        </nord-nav-item>
      </RouterLink>

      <RouterLink to="/planning/promotions">
        <nord-nav-item :active="$route.path.startsWith('/planning/promotions')" icon="interface-calendar">
          Planning
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>

    <nord-nav-group heading="Gestion">
      <RouterLink to="/gestion/utilisateurs">
        <nord-nav-item :active="$route.path.startsWith('/gestion/utilisateurs')" icon="user-multiple">
          Utilisateurs
        </nord-nav-item>
      </RouterLink>

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
    </nord-nav-group>


    <nord-nav-group v-if="authStore.authenticatedUser?.teacher || authStore.authenticatedUser?.administrative_employee"
                    heading="Communication">
      <RouterLink to="/messagerie">
        <nord-nav-item :active="$route.path === '/messagerie'" icon="generic-mail">
          Messages
        </nord-nav-item>
      </RouterLink>
      <RouterLink to="/mes-demandes">
         <nord-nav-item :active="$route.path === '/mes-demandes'" icon="interface-help">
            Demandes
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
        <nord-dropdown-item href="/profil">Voir mon profil</nord-dropdown-item>
      </nord-dropdown-group>

      <nord-dropdown-group>
        <nord-dropdown-item>Aide & Support</nord-dropdown-item>
      </nord-dropdown-group>

      <nord-dropdown-item @click.prevent="logout">
        Déconnexion
        <nord-icon slot="end" name="interface-logout"></nord-icon>
      </nord-dropdown-item>
    </nord-dropdown>
  </nord-navigation>
</template>
