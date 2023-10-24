<script setup>
import PlaceForm from "@/components/Form/PlaceForm.vue";

import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {usePlaceStore} from "@/stores/place.store";

const placeStore = usePlaceStore()
placeStore.resetPlace()

onMounted(async () => {
  await placeStore.fetchPlace(useRoute().params.id)
})

</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier un lieu</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/lieux">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des lieux
        </nord-button>
      </RouterLink>
    </div>

    <PlaceForm :place="placeStore.place"/>
  </nord-card>
</template>

<style scoped>

</style>
