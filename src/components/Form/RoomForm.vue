<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useRoomStore} from "@/stores/room.store";
import {useBuildingStore} from "@/stores/building.store";
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  room: {
    type: Object,
    default: null,
  }
})

const roomStore = useRoomStore()
const buildingStore = useBuildingStore()
const applicationStore = useApplicationStore()

const selectedBuilding = ref(null)
const destroyModalOpened = ref(false)

const form = computed(() => {
  selectedBuilding.value = props.room?.building ?? ''

  return {
    name: props.room?.name ?? '',
    seats_number: props.room?.seats_number,
    building_id: props.room?.building_id ?? ''
  }
})

const store = async () => {
  form.value.building_id = selectedBuilding.value.id

  applicationStore.clearErrors()
  await roomStore.createRoom(form.value)
  await redirect()
}

const update = async () => {
  form.value.building_id = selectedBuilding.value.id

  applicationStore.clearErrors()
  await roomStore.updateRoom(props.room.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await roomStore.deleteRoom(props.room.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'rooms-list'})
}

const getBuildingLabel = ({name, place}) => `${name} (${place.name})`

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

onMounted(async () => {
  await buildingStore.fetchBuildings()
})
</script>

<template>
  <form @submit.prevent="!!room ? update() : store()">
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
          v-model="form.seats_number"
          :error="applicationStore.errors?.seats_number"
          expand
          label="Nombre de place"
          placeholder="Entrez un nombre de place"
          type="number"
      />

      <div class="n-stack n-gap-s">
        <label class="n-label">Bâtiment</label>
        <multi-select
            v-model="selectedBuilding"
            :options="buildingStore.buildings"
            :show-no-results="true"
            :custom-label="getBuildingLabel"
            buildingholder="Sélectionner un bâtiment"
            track-by="id"
        >
          <template #noResult>Pas de bâtiments correspondants</template>
          <template #noOptions>Pas de bâtiments trouvés</template>
        </multi-select>
      </div>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!room ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!room" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
