<script setup>
import CityForm from "@/components/Form/CityForm.vue";
import {useCityStore} from "@/stores/city.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const cityStore = useCityStore()
cityStore.resetCity()

onMounted(async () => {
  await cityStore.fetchCity(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une ville</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/villes">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des villes
        </nord-button>
      </RouterLink>
    </div>

    <CityForm :city="cityStore.city"/>
  </nord-card>
</template>

<style scoped>

</style>
