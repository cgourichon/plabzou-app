<script setup>
import {usePlaceStore} from "@/stores/place.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const placeStore = usePlaceStore()
placeStore.resetPlaces()

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
    field: "street_address",
    headerName: "Adresse",
  },
  {
    field: "city",
    headerName: "Ville",
    valueFormatter: ({value}) => `${value.postcode} - ${value.name}`
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await placeStore.fetchPlaces()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des lieux</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/lieux/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une ville
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="placeStore.places"/>
  </nord-card>
</template>

<style scoped>

</style>
