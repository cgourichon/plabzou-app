<script setup>
import BuildingForm from "@/components/Form/BuildingForm.vue";
import {useBuildingStore} from "@/stores/building.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const buildingStore = useBuildingStore()
buildingStore.resetBuilding()

onMounted(async () => {
  await buildingStore.fetchBuilding(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier un bâtiment</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/batiments">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des bâtiments
        </nord-button>
      </RouterLink>
    </div>

    <BuildingForm :building="buildingStore.building"/>
  </nord-card>
</template>

<style scoped>

</style>
