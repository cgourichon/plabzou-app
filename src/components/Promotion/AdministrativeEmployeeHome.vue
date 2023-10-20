<script setup>
import {usePromotionStore} from "@/stores/promotion.store";
import {onMounted} from "vue";
import ProgressBar from "@/components/Promotion/ProgressBar.vue";
import PromotionProgress from "@/components/Promotion/PromotionProgress.vue";
import EditAction from "@/components/Action/EditAction.vue";
import {getFrenchDate} from "../../utils/dayjs";
import {AgGridVue} from "ag-grid-vue3";
import {reactive, ref} from "vue";

const promotionStore = usePromotionStore()
promotionStore.resetPromotions()

const selectedPromotion = ref(null)
const modal = ref(null)

// j'ai essayé l'event rowSelected à la place, mais après la première sélection il y avait un décalage (toujours la sélection précédente d'affiché)
const onSelectionChanged = () => {
  // la méthode est au pluriel et renvoit toujours un array, mais la sélection est en single
  const selectedRows = gridApi.value.getSelectedRows();
  selectedPromotion.value = selectedRows[0]
  if (modal.value) modal.value.showModal()
}

onMounted(async () => {
  await promotionStore.fetchPromotions({advancement:1})
})

// copier coller de DataTable.vue pour le reste
const components = {
  progressCellRender: ProgressBar,
  actionCellRender: EditAction
}

const gridApi = ref(null) // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api
}

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    {
      field: "id",
      headerName: "ID",
      type: "rightAligned",
    },
    {
      field: "name",
      headerName: "Promotion",
    },
    {
      field: "course.name",
      headerName: "Cursus",
    },
    {
      field: "city.name",
      headerName: "Ville de rattachement",
    },
    {
      field: "percentage",
      headerName: "Progression",
      cellRenderer: "progressCellRender",
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
      field: "id",
      headerName: "Modifier",
      cellRenderer: "actionCellRender",
    },
  ],
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  resizable: true,
}

const quickSearch = ref('')

const onFilterTextBoxChanged = () => {
  gridApi.value.setQuickFilter(quickSearch.value);
}
</script>

<template>
  <nord-card>
    <h2 slot="header">Avancement des plannings</h2>
    <nord-stack v-if="promotionStore.promotions">
      <nord-input
          id="quick-search"
          v-model="quickSearch"
          hide-label
          label="Rechercher et filtrer"
          placeholder="Rechercher et filtrer"
          type="search"
          @input="onFilterTextBoxChanged"
      />

      <ag-grid-vue
          :columnDefs="columnDefs.value"
          :components="{...components}"
          :defaultColDef="defaultColDef"
          :rowData="promotionStore.promotions"
          class="ag-theme-nord"
          style="height: 500px"
          rowSelection="single"
          @grid-ready="onGridReady"
          @selection-changed="onSelectionChanged"
      />
    </nord-stack>

    <nord-modal v-if="selectedPromotion" ref="modal" size="l" open aria-labelledby="title">
      <h2 slot="header" id="title">Promotion : {{ selectedPromotion.name }}</h2>
      <promotion-progress :promotion="selectedPromotion" />
    </nord-modal>
  </nord-card>
</template>

<style scoped>
.ag-row[aria-selected="true"] {
  background-color: brown !important;
}
</style>