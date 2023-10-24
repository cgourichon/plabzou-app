<script setup>
import BuildingForm from "@/components/Form/BuildingForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter un bâtiment</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/batiments">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des bâtiments
        </nord-button>
      </RouterLink>
    </div>

    <BuildingForm/>
  </nord-card>
</template>

<style scoped>

</style>
