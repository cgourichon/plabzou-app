<script setup>
import {useTrainingStore} from "@/stores/training.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const trainingStore = useTrainingStore()
trainingStore.resetTrainings()

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
    field: "categories",
    headerName: "Catégories",
    valueFormatter: ({value}) => value.map(e => e.name).join(' - ')
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await trainingStore.fetchTrainings()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des formations</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/formations/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une formation
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="trainingStore.trainings"/>
  </nord-card>
</template>

<style scoped>

</style>
