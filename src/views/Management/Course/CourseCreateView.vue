<script setup>
import CourseForm from "@/components/Form/CourseForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter un cursus</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/cursus">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des cursus
        </nord-button>
      </RouterLink>
    </div>

    <CourseForm/>
  </nord-card>
</template>

<style scoped>

</style>
