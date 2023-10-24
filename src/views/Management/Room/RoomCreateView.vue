<script setup>
import RoomForm from "@/components/Form/RoomForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter une salle</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/salles">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des salles
        </nord-button>
      </RouterLink>
    </div>

    <RoomForm/>
  </nord-card>
</template>

<style scoped>

</style>
