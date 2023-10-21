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
  },
  name: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['reset'])

const timeslotStore = useTimeslotStore()
const roomStore = useRoomStore()
const trainingStore = useTrainingStore()
const learnerStore = useLearnerStore()
const teacherStore = useTeacherStore()
const promotionStore = usePromotionStore()
const applicationStore = useApplicationStore()

const selectedTraining = ref(null)
const selectedPromotions = ref([])
const selectedRoom = ref(null)
const selectedLearners = ref([])
const selectedTeachers = ref([])
const filterLearnersByTraining = ref(true)

const form = computed(() => ({
  training: props.timeslot?.training ?? '',
  room: props.timeslot?.room ?? '',
  starts_at: props.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.timeslot?.starts_at) : '',
  ends_at: props.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.timeslot?.ends_at) : '',
  is_validated: props.timeslot?.is_validated ?? '',
  learners: props.timeslot?.learners ?? [],
  teachers: props.timeslot?.teachers ?? [],
  promotions: props.timeslot?.promotions ?? [],
}))

const setMultiselectValuesFromTimeslot = async () => {
  selectedTraining.value = props.timeslot.training
  selectedPromotions.value = props.timeslot.promotions
  selectedRoom.value = props.timeslot.room
  selectedLearners.value = props.timeslot.learners
  selectedTeachers.value = props.timeslot.teachers
}

const setMultiselectValuesToForm = () => {
  form.value.training = selectedTraining.value.id
  form.value.room = selectedRoom.value?.id
  form.value.learners = selectedLearners.value
  form.value.teachers = selectedTeachers.value
  form.value.promotions = selectedPromotions.value
}

const store = async () => {
  setMultiselectValuesToForm()

  applicationStore.clearErrors()
  await timeslotStore.createTimeslot(form.value)
  await redirect()
}

const update = async () => {
  setMultiselectValuesToForm()

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
  if (!applicationStore.hasErrors && props.name) await router.push({name: props.name})
  else emit('reset')
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

watch(() => selectedTraining.value, async () => {
  selectedPromotions.value = []
  selectedLearners.value = []
  selectedTeachers.value = []

  await fetchDependencies()

  if (props.timeslot) {
    selectedPromotions.value = props.timeslot.promotions
    selectedLearners.value = props.timeslot.learners
    selectedTeachers.value = props.timeslot.teachers
  }
})

watch(() => selectedPromotions.value, async (newPromotion, oldPromotion) => {
  // Ajouter les apprenants lors de l'ajout d'une promotion
  if (!oldPromotion || (newPromotion.length > oldPromotion.length)) {
    const learners = newPromotion.flatMap(promotion => promotion.learners)
    selectedLearners.value = [...selectedLearners.value, ...learners]
  }

  // Supprimer les apprenants lors de la suppression d'une promotion
  if (oldPromotion && (newPromotion.length < oldPromotion.length)) {
    const learners = oldPromotion.flatMap(promotion => promotion.learners)
    selectedLearners.value = selectedLearners.value.filter(learner => !learners.includes(learner))
  }

  // Supprimer les apprenants en double
  selectedLearners.value = selectedLearners.value.filter(learner => learner !== undefined)
  const learners = selectedLearners.value.map(learner => learner.user_id)
  console.log(selectedLearners)
  console.log(learners);
  selectedLearners.value = selectedLearners.value.filter((learner, index) => !learners.includes(learner.user_id, index + 1))
})

watch(() => props.timeslot, async () => {
  await setMultiselectValuesFromTimeslot()
})

onMounted(async () => {
  await roomStore.fetchRooms()
  await trainingStore.fetchTrainings()
})
const addressRoom = computed(() => {
    if(selectedRoom.value) {
      let room = selectedRoom.value

      return room.building.place.name + ' , ' + room.building.place.street_address + ' - ' + room.building.place.city.postcode + ' ' + room.building.place.city.name
    }
    return '-'
})

const buildingRoom = computed(() => selectedRoom.value?.building?.name ?? '-')
</script>

<template>
  <form @submit.prevent="!!timeslot ? update() : store()">
    <nord-stack gap="xl">
      <nord-stack direction="horizontal">
        <nord-stack>
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

          <nord-stack>
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
              <template #noOptions>Pas de formations trouvées</template>
            </multi-select>
            <div
                v-if="applicationStore.errors?.training"
                class="n-error"
                role="alert"
            >
              {{ applicationStore.errors?.training[0] }}
            </div>
          </nord-stack>
          <nord-stack v-if="selectedTraining">
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
              <template #noOptions>Pas de salles trouvées</template>
            </multi-select>
            <div
                v-if="applicationStore.errors?.room"
                class="n-error"
                role="alert"
            >
              {{ applicationStore.errors?.room[0] }}
            </div>
          </nord-stack>

          <nord-input v-if="selectedRoom"
                      :value="buildingRoom"
                      expand
                      label="Bâtiment"
                      readonly/>

          <nord-input v-if="selectedRoom"
                      :value="addressRoom"
                      expand
                      label="Adresse"
                      readonly
          />
        </nord-stack>
        <nord-divider/>
        <nord-stack>
          <template v-if="selectedTraining">
            <nord-stack>
              <label class="n-label">Statut</label>

              <nord-checkbox class="n-padding-xs"
                             v-model="form.is_validated"
                             :error="applicationStore.errors?.is_validated"
                             label="Créneau validé"
                             type="checkbox"
              />
            </nord-stack>

            <nord-stack>
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
            </nord-stack>


            <nord-stack>
              <label class="n-label">Promotions</label>
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
                <template #noOptions>Aucune promotions trouvées</template>
              </multi-select>
              <div
                  v-if="applicationStore.errors?.promotions"
                  class="n-error"
                  role="alert"
              >
                {{ applicationStore.errors?.promotions[0] }}
              </div>
            </nord-stack>

            <nord-stack>
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
            </nord-stack>
          </template>
        </nord-stack>
      </nord-stack>
      <nord-stack>
          <nord-stack direction="horizontal">
            <nord-button expand type="submit" variant="primary">
              {{ !!timeslot ? 'Modifier' : 'Ajouter' }}
            </nord-button>

            <nord-button v-if="!!timeslot" expand type="button" variant="danger" @click="destroy">
              Supprimer
            </nord-button>
          </nord-stack>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
