<script setup>
import CityForm from "@/components/Form/CityForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter une ville</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/villes">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des villes
        </nord-button>
      </RouterLink>
    </div>

    <CityForm/>
  </nord-card>
</template>

<style scoped>

</style>
