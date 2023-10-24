<script setup>
import {useRoomStore} from "@/stores/room.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const roomStore = useRoomStore()
roomStore.resetRooms()

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
    field: 'seats_number',
    headerName: 'Places'
  },
  {
    field: "building",
    headerName: "Bâtiment",
    valueFormatter: ({value}) => `${value.name} (${value.place.name})`
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await roomStore.fetchRooms()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des salles</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/salles/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une salle
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="roomStore.rooms"/>
  </nord-card>
</template>

<style scoped>

</style>
