<script setup>
import { AgGridVue } from "ag-grid-vue3";
import {onMounted, reactive, ref} from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  components: {
    type: Object,
    required: false
  }
})

const gridApi = ref(null) // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params) => {
  gridApi.value = params.api;
}

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: props.columns,
})

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1
}
</script>

<template>
  <ag-grid-vue
      style="height: 500px"
      class="ag-theme-nord"
      :columnDefs="columnDefs.value"
      :rowData="data"
      :defaultColDef="defaultColDef"
      :components="{...components}"
      @grid-ready="onGridReady"
  />
</template>

<style scoped>

</style>
