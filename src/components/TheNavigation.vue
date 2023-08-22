<script setup>
import {RouterLink} from 'vue-router'
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
      <RouterLink to="/about">
        <nord-nav-item :active="$route.path === '/about'" icon="interface-info">
          A propos
        </nord-nav-item>
      </RouterLink>
    </nord-nav-group>
    <nord-dropdown slot="footer" expand>
      <nord-button slot="toggle" expand>
        <nord-avatar slot="start" aria-hidden="true" name="Prénom NOM"></nord-avatar>
        Prénom NOM
      </nord-button>
      <nord-dropdown-group>
        <nord-dropdown-item href="#">Voir mon profil</nord-dropdown-item>
      </nord-dropdown-group>
      <nord-dropdown-group>
        <nord-dropdown-item>Aide & Support</nord-dropdown-item>
      </nord-dropdown-group>
      <nord-dropdown-item>
        Déconnexion
        <nord-icon slot="end" name="interface-logout"></nord-icon>
      </nord-dropdown-item>
    </nord-dropdown>
  </nord-navigation>
</template>
