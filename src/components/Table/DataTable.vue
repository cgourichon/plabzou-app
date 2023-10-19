<script setup>
import {AgGridVue} from "ag-grid-vue3";
import {reactive, ref} from "vue";

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
  gridApi.value = params.api
}

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: props.columns,
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
  <nord-stack>
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
        :rowData="data"
        class="ag-theme-nord"
        style="height: 500px"
        @grid-ready="onGridReady"
    />
  </nord-stack>
</template>

<style scoped>

</style>
