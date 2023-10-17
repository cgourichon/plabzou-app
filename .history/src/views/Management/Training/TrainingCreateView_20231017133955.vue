<script setup>
import TrainingForm from "@/components/Form/TrainingForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter une formation</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/formations">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des formations
        </nord-button>
      </RouterLink>
    </div>

    <TrainingForm/>
  </nord-card>
</template>

<style scoped>

</style>
