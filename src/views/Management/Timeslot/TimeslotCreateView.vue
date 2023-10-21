<script setup>
import TimeslotForm from "@/components/Form/TimeslotForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter un créneau</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/creneaux">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des créneaux
        </nord-button>
      </RouterLink>
    </div>

    <TimeslotForm name="timeslots-list"/>
  </nord-card>
</template>

<style scoped>

</style>
