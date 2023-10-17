<script setup>
import CategoryForm from "@/components/Form/CategoryForm.vue";
import {useCategoryStore} from "@/stores/category.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const categoryStore = useCategoryStore()
categoryStore.resetCategory()

onMounted(async () => {
  await categoryStore.fetchCategory(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une catégorie</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/categories">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des catégories
        </nord-button>
      </RouterLink>
    </div>

    <CategoryForm :category="categoryStore.category"/>
  </nord-card>
</template>

<style scoped>

</style>
