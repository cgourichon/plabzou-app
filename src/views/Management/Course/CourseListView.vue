<script setup>
import {onMounted} from "vue";
import {useCourseStore} from "@/stores/course.store";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const courseStore = useCourseStore()
courseStore.resetCourses()

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
  await courseStore.fetchCourses()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des cursus</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/cursus/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un cursus
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="courseStore.courses"/>
  </nord-card>
</template>

<style scoped>

</style>
