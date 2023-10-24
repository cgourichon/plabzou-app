<script setup>
import PlaceForm from "@/components/Form/PlaceForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter un lieu</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/lieux">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des lieux
        </nord-button>
      </RouterLink>
    </div>

    <PlaceForm/>
  </nord-card>
</template>

<style scoped>

</style>
