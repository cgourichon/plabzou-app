<script setup>
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore()
</script>

<template>
  <nord-header slot="header">
    <h2 class="n-font-size-m">Mon application dédiée à la formation</h2>
    <div slot="end">
      <nord-badge v-if="authStore.authenticatedUser" variant="info">
        Connecté en tant que
        {{
          authStore.authenticatedUser?.administrative_employee
              ? 'employé administratif'
              : authStore.authenticatedUser?.teacher
                  ? 'formateur'
                  : authStore.authenticatedUser?.learner
                      ? 'apprenant'
                      : ''
        }}
      </nord-badge>
    </div>
  </nord-header>
</template>
