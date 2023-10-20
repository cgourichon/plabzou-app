<script setup>
import UserForm from "@/components/Form/UserForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter un utilisateur</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/utilisateurs">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des utilisateurs
        </nord-button>
      </RouterLink>
    </div>

    <UserForm/>
  </nord-card>
</template>

<style scoped>

</style>
