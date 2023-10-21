<script setup>
import {useTimeslotStore} from "@/stores/timeslot.store";
import {onMounted} from "vue";
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const timeslotStore = useTimeslotStore()
timeslotStore.resetTimeslots()

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
    field: "starts_at",
    headerName: "Date de début",
    valueFormatter: ({value}) => getFrenchDateTimeWithoutTimeZone(value)
  },
  {
    field: "ends_at",
    headerName: "Date de fin",
    valueFormatter: ({value}) => getFrenchDateTimeWithoutTimeZone(value)
  },
  {
    field: "is_validated",
    headerName: "Créneau validé",
    valueFormatter: ({value}) => value ? 'Oui' : 'Non'
  },
  {
    field: "room.name",
    headerName: "Salle",
  },
  {
    field: "training.name",
    headerName: "Formation",
  },
  {
    field: "teachers",
    headerName: "Formateur(s)",
    valueFormatter: ({value}) => Object.keys(value).length
  },
  {
    field: "promotions",
    headerName: "Promotion(s)",
    valueFormatter: ({value}) => value ? value.length > 2 ? Object.keys(value).length : value.map(e => e.name).join(' - ') : null
  },
  {
    field: "learners",
    headerName: "Apprenant(s)",
    valueFormatter: ({value}) => Object.keys(value).length
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await timeslotStore.fetchTimeslots()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des créneaux</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/creneaux/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un créneau
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="timeslotStore.timeslots"/>
  </nord-card>
</template>

<style scoped>

</style>
