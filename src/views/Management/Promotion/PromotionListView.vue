<script setup>
import {onMounted} from "vue";
import {usePromotionStore} from "@/stores/promotion.store";
import {getFrenchDate} from "@/utils/dayjs"
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const promotionStore = usePromotionStore()
promotionStore.resetPromotions()

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
    field: "course.name",
    headerName: "Cursus suivi",
  },
  {
    field: "starts_at",
    headerName: "Date de début",
    valueFormatter: ({value}) => getFrenchDate(value)
  },
  {
    field: "ends_at",
    headerName: "Date de fin",
    valueFormatter: ({value}) => getFrenchDate(value)
  },
  {
    field: "learners",
    headerName: "Apprenant(s)",
    valueFormatter: ({value}) => Object.keys(value).length
  },
  {
    field: "city.name",
    headerName: "Ville de rattachement",
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

onMounted(async () => {
  await promotionStore.fetchPromotions()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des promotions</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/promotions/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une promotion
        </nord-button>
      </RouterLink>
    </div>

    <DataTable :columns="columns" :components="components" :data="promotionStore.promotions"/>
  </nord-card>
</template>

<style scoped>

</style>
