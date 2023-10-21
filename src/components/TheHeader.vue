<script setup>
import {useAuthStore} from "@/stores/auth.store";
import pbzLogoLarge from '@/assets/images/pbz-logo-large.png'

const authStore = useAuthStore()
</script>

<template>
  <nord-header slot="header">
    <img :src="pbzLogoLarge" alt="Logo Plabzou" height="35"/>
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
