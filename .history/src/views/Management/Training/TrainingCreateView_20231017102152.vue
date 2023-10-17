<script setup>
import CategoryForm from "@/components/Form/CategoryForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter une catégorie</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/categories">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des catégories
        </nord-button>
      </RouterLink>
    </div>

    <CategoryForm/>
  </nord-card>
</template>

<style scoped>

</style>
