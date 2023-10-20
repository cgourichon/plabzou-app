<script setup>
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore()
</script>

<template>
  <nord-header slot="header">
    <h1 class="n-typescale-l">Plabzou - Application de planning</h1>
    <div slot="end">
      <nord-badge variant="info">
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
