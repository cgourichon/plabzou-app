<script setup>
import PromotionForm from "@/components/Form/PromotionForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Ajouter une promotion</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/promotions">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des promotions
        </nord-button>
      </RouterLink>
    </div>

    <PromotionForm/>
  </nord-card>
</template>

<style scoped>

</style>
