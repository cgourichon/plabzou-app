<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import {useRoomStore} from "@/stores/room.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useTeacherStore} from "@/stores/teacher.store";
import router from "@/router";
import {computed, onMounted, ref, watch} from "vue";
import {useTrainingStore} from "@/stores/training.store";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";

const props = defineProps({
  timeslot: {
    type: Object,
    default: null,
  }
})

const timeslotStore = useTimeslotStore()
const roomStore = useRoomStore()
const trainingStore = useTrainingStore()
const learnerStore = useLearnerStore()
const teacherStore = useTeacherStore()
const applicationStore = useApplicationStore()

const selectedLearners = ref(null)
const selectedTeachers = ref(null)

const form = computed(() => {
  selectedLearners.value = props.timeslot?.learners ?? []
  selectedTeachers.value = props.timeslot?.teachers ?? []

  return {
    training: props.timeslot?.training_id ?? '',
    room: props.timeslot?.room_id ?? '',
    starts_at: props.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.timeslot?.starts_at) : '',
    ends_at: props.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.timeslot?.ends_at) : '',
    is_validated: props.timeslot?.is_validated ?? '',
    learners: props.timeslot?.learners ?? [],
    teachers: props.timeslot?.teachers ?? [],
  }
})

const store = async () => {
  form.value.learners = selectedLearners.value
  form.value.teachers = selectedTeachers.value

  applicationStore.clearErrors()
  await timeslotStore.createTimeslot(form.value)
  await redirect()
}

const update = async () => {
  form.value.learners = selectedLearners.value
  form.value.teachers = selectedTeachers.value

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

const fetchTeachers = async () => {
  teacherStore.resetTeachers()
  if (form.value.training) await teacherStore.fetchTeachers({training: form.value.training})
}

onMounted(async () => {
  await roomStore.fetchRooms()
  await trainingStore.fetchTrainings()
  await learnerStore.fetchLearners()
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
          @change="fetchTeachers"
      >
        <option value="" selected>Choisir une formation</option>
        <option v-for="training in trainingStore.trainings" :value="training.id">{{ training.name }}</option>
      </nord-select>

      <nord-select
          v-model="form.room"
          :error="applicationStore.errors?.room"
          expand
          label="Salle"
      >
        <option value="" selected>Choisir une salle</option>
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

      <div class="n-stack n-gap-s">
        <label class="n-label">Apprenants</label>
        <multi-select
            v-model="selectedLearners"
            :allow-empty="true"
            :clear-on-select="true"
            :close-on-select="false"
            :hide-selected="true"
            :multiple="true"
            :options="learnerStore.learners"
            :select-label="null"
            :show-no-results="true"
            label="full_name"
            placeholder="Ajouter des apprenants"
            track-by="user_id"
        >
          <template #noResult>Pas d'apprenants correspondants</template>
          <template #noOptions>Pas d'apprenants...</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.learners"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.learners[0] }}
        </div>
      </div>

      <div class="n-stack n-gap-s">
        <label class="n-label">Formateurs</label>
        <multi-select
            v-model="selectedTeachers"
            :allow-empty="true"
            :clear-on-select="true"
            :close-on-select="false"
            :hide-selected="true"
            :multiple="true"
            :options="teacherStore.teachers"
            :select-label="null"
            :show-no-results="true"
            label="full_name"
            placeholder="Ajouter des formateurs"
            track-by="user_id"
        >
          <template #noResult>Pas de formateurs correspondants</template>
          <template #noOptions>Choisissez une formation</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.teachers"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.teachers[0] }}
        </div>
      </div>

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
