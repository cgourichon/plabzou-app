<script setup>
import {useBuildingStore} from "@/stores/building.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const buildingStore = useBuildingStore()
buildingStore.resetBuildings()

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
    field: "place.name",
    headerName: "Lieu",
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await buildingStore.fetchBuildings()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des bâtiments</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/batiments/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un bâtiment
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="buildingStore.buildings"/>
  </nord-card>
</template>

<style scoped>

</style>
