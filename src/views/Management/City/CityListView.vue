<script setup>
import {useCityStore} from "@/stores/city.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const cityStore = useCityStore()
cityStore.resetCities()

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
    field: "postcode",
    headerName: "Code postal",
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await cityStore.fetchCities()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des villes</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/villes/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une ville
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="cityStore.cities"/>
  </nord-card>
</template>

<style scoped>

</style>
