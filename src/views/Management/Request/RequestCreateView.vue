<script setup>
import RequestForm from "@/components/Form/RequestForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Créer une demande</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/demandes">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des demandes
        </nord-button>
      </RouterLink>
    </div>

    <RequestForm/>
  </nord-card>
</template>

<style scoped>

</style>