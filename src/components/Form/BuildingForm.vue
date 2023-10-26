<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useBuildingStore} from "@/stores/building.store";
import {usePlaceStore} from "@/stores/place.store";
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  building: {
    type: Object,
    default: null,
  }
})

const buildingStore = useBuildingStore()
const placeStore = usePlaceStore()
const applicationStore = useApplicationStore()

const selectedPlace = ref(null)
const destroyModalOpened = ref(false)

const form = computed(() => {
  selectedPlace.value = props.building?.place ?? ''

  return {
    name: props.building?.name ?? '',
    place_id: props.building?.place_id ?? ''
  }
})

const store = async () => {
  form.value.place_id = selectedPlace.value.id

  applicationStore.clearErrors()
  await buildingStore.createBuilding(form.value)
  await redirect()
}

const update = async () => {
  form.value.place_id = selectedPlace.value.id

  applicationStore.clearErrors()
  await buildingStore.updateBuilding(props.building.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await buildingStore.deleteBuilding(props.building.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'buildings-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

onMounted(async () => {
  await placeStore.fetchPlaces()
})
</script>

<template>
  <form @submit.prevent="!!building ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.name"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <div class="n-stack n-gap-s">
        <label class="n-label">Lieu</label>
        <multi-select
            v-model="selectedPlace"
            :options="placeStore.places"
            :show-no-results="true"
            label="name"
            placeholder="Sélectionner une ville"
            track-by="id"
        >
          <template #noResult>Pas de lieux correspondants</template>
          <template #noOptions>Pas de lieux trouvés</template>
        </multi-select>
      </div>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!building ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!building" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
