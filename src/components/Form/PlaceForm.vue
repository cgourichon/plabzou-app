<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useCityStore} from "@/stores/city.store";
import {usePlaceStore} from "@/stores/place.store";
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  place: {
    type: Object,
    default: null,
  }
})

const cityStore = useCityStore()
const placeStore = usePlaceStore()
const applicationStore = useApplicationStore()

const selectedCity = ref(null)
const destroyModalOpened = ref(false)

const form = computed(() => {
  selectedCity.value = props.place?.city ?? ''

  return {
    name: props.place?.name ?? '',
    street_address: props.place?.street_address ?? '',
    city_id: props.place?.city_id ?? ''
  }
})

const store = async () => {
  form.value.city_id = selectedCity.value.id

  applicationStore.clearErrors()
  await placeStore.createPlace(form.value)
  await redirect()
}

const update = async () => {
  form.value.city_id = selectedCity.value.id

  applicationStore.clearErrors()
  await placeStore.updatePlace(props.place.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await placeStore.deletePlace(props.place.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'places-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

onMounted(async () => {
  await cityStore.fetchCities()
})

const nameWithPostcode = ({name, postcode}) => `${postcode} - ${name}`
</script>

<template>
  <form @submit.prevent="!!place ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.name"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <nord-input
          v-model="form.street_address"
          :error="applicationStore.errors?.street_address"
          expand
          label="Adresse"
          placeholder="Entrez une adresse"
          type="text"
      />

      <div class="n-stack n-gap-s">
        <label class="n-label">Ville</label>
        <multi-select
            v-model="selectedCity"
            :options="cityStore.cities"
            :show-no-results="true"
            :customLabel="nameWithPostcode"
            placeholder="Sélectionner une ville"
            track-by="id"
        >
          <template #noResult>Pas de villes correspondantes</template>
          <template #noOptions>Pas de villes trouvées</template>
        </multi-select>
      </div>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!place ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!place" expand type="button" variant="dashed" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
