<script setup>
import {useApplicationStore} from "@/stores/application.store";

const applicationStore = useApplicationStore()
</script>

<template>
  <nord-empty-state>
    <h2>Erreur</h2>
    <p>
      {{ applicationStore.errors?.message ?? 'Une erreur est survenue' }}
    </p>
    <a href="/">
      <nord-button>
        Retourner à l'accueil
      </nord-button>
    </a>
  </nord-empty-state>
</template>
