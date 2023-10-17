<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import {useRoomStore} from "@/stores/room.store";
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import {useTrainingStore} from "@/stores/training.store";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";
import {useUserStore} from "@/stores/user.store";

const props = defineProps({
  timeslot: {
    type: Object,
    default: null,
  }
})

const timeslotStore = useTimeslotStore()
const roomStore = useRoomStore()
const trainingStore = useTrainingStore()
const userStore = useUserStore()
const applicationStore = useApplicationStore()

const selectedLearners = ref(null)

const learnersLabel = (option) => {
  return `${option.first_name} ${option.last_name}`
};

const form = computed(() => {
  selectedLearners.value = props.timeslot?.learners ?? []

  return {
    training: props.timeslot?.training_id ?? '',
    room: props.timeslot?.room_id ?? '',
    starts_at: props.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.timeslot?.starts_at) : '',
    ends_at: props.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.timeslot?.ends_at) : '',
    is_validated: props.timeslot?.is_validated ?? '',
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await timeslotStore.createTimeslot(form.value)
  await redirect()
}

const update = async () => {
  applicationStore.clearErrors()
  await timeslotStore.updateTimeslot(props.timeslot.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await timeslotStore.deleteTimeslot(props.timeslot.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'timeslots-list'})
}

onMounted(async () => {
  await roomStore.fetchRooms()
  await trainingStore.fetchTrainings()
  await userStore.fetchLearners()
})
</script>

<template>
  <form @submit.prevent="!!timeslot ? update() : store()">
    <nord-stack>
      <nord-select
          v-model="form.training"
          :error="applicationStore.errors?.training"
          expand
          label="Formation"
      >
        <option :value="null" selected>Choisir une formation</option>
        <option v-for="training in trainingStore.trainings" :value="training.id">{{ training.name }}</option>
      </nord-select>

      <nord-select
          v-model="form.room"
          :error="applicationStore.errors?.room"
          expand
          label="Salle"
      >
        <option :value="null" selected>Choisir une salle</option>
        <option v-for="room in roomStore.rooms" :value="room.id">{{ room.name }}</option>
      </nord-select>

      <nord-input
          v-model="form.starts_at"
          :error="applicationStore.errors?.starts_at"
          expand
          label="Date de début"
          type="datetime-local"
      />

      <nord-input
          v-model="form.ends_at"
          :error="applicationStore.errors?.ends_at"
          expand
          label="Date de fin"
          type="datetime-local"
      />

      <label class="n-label">Apprenants</label>
      <multi-select
          v-model="selectedLearners"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :custom-label="learnersLabel"
          :hide-selected="true"
          :multiple="true"
          :options="userStore.learners"
          :select-label="null"
          :show-no-results="true"
          placeholder="Ajouter des apprenants"
          track-by="id"
      >
        <template #noResult>Pas d'apprenants correspondants</template>
        <template #noOptions>Pas d'apprenants...</template>
      </multi-select>

      <nord-checkbox
          v-model="form.is_validated"
          :error="applicationStore.errors?.is_validated"
          label="Créneau validé"
          type="checkbox"
      />

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!timeslot ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!timeslot" expand type="button" variant="danger" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
