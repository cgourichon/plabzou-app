<script setup>
import {useCategoryStore} from "@/stores/category.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const categoryStore = useCategoryStore()
categoryStore.resetCategories()

const components = {
  actionsCellRender: EditAction
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    type: "rightAligned",
  },
  {
    field: "name",
    headerName: "Nom",
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des catégories</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/categories/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une catégorie
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="categoryStore.categories"/>
  </nord-card>
</template>

<style scoped>

</style>
