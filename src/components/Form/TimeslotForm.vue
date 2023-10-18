<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import {useRoomStore} from "@/stores/room.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {usePromotionStore} from "@/stores/promotion.store";
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
const promotionStore = usePromotionStore()
const applicationStore = useApplicationStore()

const selectedTraining = ref(null)
const selectedRoom = ref(null)
const selectedLearners = ref(null)
const selectedTeachers = ref(null)
const filterLearnersByTraining = ref(true)

const selectedPromotions = ref(null)

const form = computed(() => {
  selectedTraining.value = props.timeslot?.training ?? ''
  selectedRoom.value = props.timeslot?.room ?? ''
  selectedLearners.value = props.timeslot?.learners ?? []
  selectedTeachers.value = props.timeslot?.teachers ?? []

  return {
    training: '',
    room: '',
    starts_at: props.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.timeslot?.starts_at) : '',
    ends_at: props.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.timeslot?.ends_at) : '',
    is_validated: props.timeslot?.is_validated ?? '',
    learners: [],
    teachers: [],
  }
})

const store = async () => {
  form.value.training = selectedTraining.value.id
  form.value.room = selectedRoom.value.id
  form.value.learners = selectedLearners.value
  form.value.teachers = selectedTeachers.value

  applicationStore.clearErrors()
  await timeslotStore.createTimeslot(form.value)
  await redirect()
}

const update = async () => {
  form.value.training = selectedTraining.value.id
  form.value.room = selectedRoom.value.id
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

const checkFilterLearnersByTraining = async () => {
  await fetchDependencies()
}

const fetchDependencies = async () => {
  teacherStore.resetTeachers()
  learnerStore.resetLearners()
  promotionStore.resetPromotions()
  if (selectedTraining.value) {
    await teacherStore.fetchTeachers({training: selectedTraining.value.id})
    filterLearnersByTraining.value
        ? await learnerStore.fetchLearners({training: selectedTraining.value.id})
        : await learnerStore.fetchLearners()
    await promotionStore.fetchPromotions({training: selectedTraining.value.id})
  }
}

watch(
    () => selectedPromotions.value,
    (newValue, oldValue) => {

      // première promotion de sélectionné
      if (!oldValue && newValue) {

        const newLearners = newValue.map(promotion => promotion.learners).flat() // apprenants dans la promo qui vient d'être ajouté
        const diffWithSelected = newLearners.filter(learner => !selectedLearners.value.find(e => e.user_id == learner.user_id)) // si certains ont déjà été manuellement, évite les doublons

        selectedLearners.value = selectedLearners.value.concat(diffWithSelected) // ajout dans la sélection d'apprenants

      } else {

        const oldLearners = oldValue.map(promotion => promotion.learners).flat()
        const newLearners = newValue.map(promotion => promotion.learners).flat()

        // une promotion a été ajouté
        if (newValue.length > oldValue.length) {
          const diff = newLearners.filter(learner => !oldLearners.find(e => e.user_id == learner.user_id)) // différenciation entre les apprenants dans la promo qui vient d'être ajouté et ceux des promo qui était déjà là
          const diffWithSelected = diff.filter(learner => !selectedLearners.value.find(e => e.user_id == learner.user_id)) // si certains ont déjà été manuellement, évite les doublons
          selectedLearners.value = selectedLearners.value.concat(diffWithSelected) // ajout dans la sélection d'apprenants
        }

        // une promotion a été supprimé
        if (newValue.length < oldValue.length) {
          const diff = oldLearners.filter(learner => !newLearners.find(e => e.user_id == learner.user_id)) // apprenants dans la promo qui vient d'être enlevé
          selectedLearners.value = selectedLearners.value.filter(learner => !diff.find(e => e.user_id == learner.user_id)) // suppression de la sélection d'apprenants
        }

      }

    },
    {deep: true}
)

onMounted(async () => {
  await roomStore.fetchRooms()
  await trainingStore.fetchTrainings()
})

watch(() => selectedTraining.value, fetchDependencies)
</script>

<template>
  <form @submit.prevent="!!timeslot ? update() : store()">
    <nord-stack>
      <div class="n-stack n-gap-s">
        <label class="n-label">Formation</label>
        <multi-select
            v-model="selectedTraining"
            :options="trainingStore.trainings"
            :show-no-results="true"
            label="name"
            placeholder="Sélectionner une formation"
            track-by="id"
        >
          <template #noResult>Pas de formations correspondantes</template>
          <template #noOptions>Pas de formations...</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.training"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.training[0] }}
        </div>
      </div>

      <div class="n-stack n-gap-s">
        <label class="n-label">Ajouté des promotions</label>
        <multi-select
            v-model="selectedPromotions"
            :allow-empty="true"
            :clear-on-select="true"
            :close-on-select="false"
            :hide-selected="true"
            :multiple="true"
            :options="promotionStore.promotions"
            :select-label="null"
            :show-no-results="true"
            label="name"
            placeholder="Ajouter des promotions"
            track-by="id"
        >
          <template #noResult>Pas de promotions correspondantes</template>
          <template #noOptions>
            <span v-if="selectedTraining">
              Aucune promotions trouvées
            </span>
            <span v-else>
              Choisissez une formation
            </span>
          </template>
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
        <label class="n-label">Salle</label>
        <multi-select
            v-model="selectedRoom"
            :options="roomStore.rooms"
            :show-no-results="true"
            label="name"
            placeholder="Sélectionner une salle"
            track-by="id"
        >
          <template #noResult>Pas de salles correspondantes</template>
          <template #noOptions>Pas de salles...</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.room"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.room[0] }}
        </div>
      </div>

      <nord-stack direction="horizontal">
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
      </nord-stack>

      <template v-if="selectedTraining">
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
            <template #noOptions>Aucun apprenants trouvés</template>
          </multi-select>
          <div>
            <nord-toggle
                v-model="filterLearnersByTraining"
                :checked="filterLearnersByTraining"
                label="Filtrer les apprenants par formation"
                size="s"
                type="checkbox"
                @change="checkFilterLearnersByTraining"
            />
          </div>
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
            <template #noOptions>Aucun formateurs trouvés</template>
          </multi-select>
          <div
              v-if="applicationStore.errors?.teachers"
              class="n-error"
              role="alert"
          >
            {{ applicationStore.errors?.teachers[0] }}
          </div>
        </div>
      </template>

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
