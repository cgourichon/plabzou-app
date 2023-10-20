<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";

import {useApplicationStore} from "@/stores/application.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {usePromotionStore} from "@/stores/promotion.store";
import {useTrainingStore} from "@/stores/training.store";
import {useRoomStore} from "@/stores/room.store";
import {useLearnerStore} from "@/stores/learner.store";

const applicationStore = useApplicationStore()
const teacherStore = useTeacherStore()
const learnerStore = useLearnerStore()
const promotionStore = usePromotionStore()
const trainingStore = useTrainingStore()
const roomStore = useRoomStore()

const props = defineProps({
  currentEvent: {
    type: Object,
    default: null,
  },
  previousEvent: {
    type: Object,
    default: null
  },
  promotion: {
    type: Object,
    default: null,
  }
})

const selectedTraining = ref(null)
const selectedRoom = ref(null)
const selectedLearners = ref(null)
const selectedTeachers = ref(null)
const validatedLearners = ref(null)
const isEditingTimeslot = ref(false)
const isValidated = ref(false)

const emits = defineEmits(['close'])

const toggleEditing = () => {
  initForm()
  if (props.previousEvent && isEditingTimeslot.value) {
    emits('close')
  } else {
    isEditingTimeslot.value = !isEditingTimeslot.value
  }
}

const resetModal = () => {
  isEditingTimeslot.value = false
  initForm()
  emits('close')
}

const form = computed(() => initForm())

const initForm = () => {
  selectedTraining.value = props.currentEvent?.extendedProps?.timeslot?.training ?? ''
  selectedRoom.value = props.currentEvent?.extendedProps?.timeslot?.room ?? ''
  selectedLearners.value = props.currentEvent?.extendedProps?.timeslot?.learners ?? []
  selectedTeachers.value = props.currentEvent?.extendedProps?.timeslot?.teachers ?? []
  isValidated.value = props.currentEvent?.extendedProps?.timeslot?.is_validated ?? ''

  return {
    training: '',
    room: '',
    starts_at: props.currentEvent?.extendedProps?.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.currentEvent?.extendedProps?.timeslot?.starts_at) : '',
    ends_at: props.currentEvent?.extendedProps?.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.currentEvent?.extendedProps?.timeslot?.ends_at) : '',
    is_validated: props.currentEvent?.extendedProps?.timeslot?.is_validated,
    learners: props.currentEvent?.extendedProps?.timeslot?.learners,
    teachers: props.currentEvent?.extendedProps?.timeslot?.teachers,
  }
}


const learnersNumber = computed(() => form?.value?.learners?.length)
const learnersLabel = computed(() => learnersNumber.value > 1 ? 'apprenants inscrits' : 'apprenant inscrit')

const teachersNumber = computed(() => form?.value?.teachers?.length)
const teachersLabel = computed(() => learnersNumber.value > 1 ? 'formateurs' : 'formateur')

const filteredPromotionLearners = computed(() => validatedLearners?.value?.filter(
        learner => promotionStore.promotion?.value?.learners.filter(
            promotionLearner => promotionLearner.user_id === learner.user_id)
    )
)
const filteredOthersLearners = computed(() => validatedLearners?.value?.filter(
        (learner) => promotionStore.promotion?.value?.learners.filter(
            (promotionLearner) => promotionLearner.user_id !== learner.user_id)
    )
)

onMounted(async () => {
  validatedLearners.value = props.currentEvent?.extendedProps?.timeslot?.learners
})

watch(() => props.previousEvent, (newPreviousEvent) => {
  if (newPreviousEvent) {
    let previousStartDate = getDateTimeWithoutTimeZone(newPreviousEvent.start.toString())
    let previousEndDate = getDateTimeWithoutTimeZone(newPreviousEvent.end.toString())
    let currentStartDate = getDateTimeWithoutTimeZone(props.currentEvent.start.toString())
    let currentEndDate = getDateTimeWithoutTimeZone(props.currentEvent.end.toString())

    if (previousStartDate !== currentStartDate || previousEndDate !== currentEndDate) {
      isEditingTimeslot.value = true
      form.value.starts_at = currentStartDate
      form.value.ends_at = currentEndDate
    }
  }
})
</script>

<template>
  <nord-modal :open="props.currentEvent" size="l" @close="resetModal">
    <h2 slot="header">{{ props.currentEvent?.title }}</h2>
    <nord-stack align-items="start" direction="horizontal" justify-content="space-around">
      <nord-stack>
        <nord-input
            v-if="props.promotion"
            :value="props.promotion?.course?.name"
            expand
            label="Cursus suivi"
            readonly
        />

        <nord-stack>
          <label class="n-label">Formation</label>
          <multi-select
              v-model="selectedTraining"
              :disabled="!isEditingTimeslot"
              :options="trainingStore.trainings"
              :show-no-results="true"
              label="name"
              placeholder="Sélectionner une formation"
              track-by="id"
          >
            <template #noResult>Pas de formations correspondantes</template>
            <template #noOptions>Pas de formations trouvées</template>
          </multi-select>
        </nord-stack>

        <nord-stack direction="horizontal">
          <nord-input
              v-model="form.starts_at"
              :error="applicationStore.errors?.starts_at"
              :readonly="!isEditingTimeslot"
              expand
              label="Date de début"
              type="datetime-local"
          />

          <nord-input
              v-model="form.ends_at"
              :error="applicationStore.errors?.ends_at"
              :readonly="!isEditingTimeslot"
              expand
              label="Date de fin"
              type="datetime-local"
          />
        </nord-stack>

        <nord-stack direction="horizontal">
          <nord-stack>
            <label class="n-label">Salle</label>
            <multi-select
                v-model="selectedRoom"
                :disabled="!isEditingTimeslot"
                :options="roomStore.rooms"
                :show-no-results="true"
                label="name"
                placeholder="Sélectionner une salle"
                track-by="id"
            >
              <template #noResult>Pas de salles correspondantes</template>
              <template #noOptions>Pas de salles trouvées</template>
            </multi-select>
          </nord-stack>

          <nord-input
              v-if="selectedRoom"
              :readonly="!isEditingTimeslot"
              :value="selectedRoom.building?.name ?? '-'"
              expand
              label="Bâtiment"
          />
        </nord-stack>

        <nord-input
            v-if="selectedRoom"
            :readonly="!isEditingTimeslot"
            :value="selectedRoom.building?.place?.full_address ?? '-'"
            expand
            label="Adresse"
        />
      </nord-stack>

      <nord-stack>
        <nord-stack>
          <label class="n-label">Statut du créneau</label>

          <nord-checkbox
              v-model="isValidated"
              :disabled="!isEditingTimeslot"
              :error="applicationStore.errors?.is_validated"
              :label="isValidated ? 'Validé' : 'Non validé'"
              type="checkbox"
          />
        </nord-stack>

        <nord-stack v-if="isEditingTimeslot">
          <nord-stack>
            <label class="n-label">Formateur(s) souhaité(s)</label>

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
                track-by="user_id"
            >
              <template #noResult>Pas de formateurs correspondants</template>
              <template #noOptions>Pas de formateurs trouvés</template>
            </multi-select>
          </nord-stack>

          <nord-stack>
            <label class="n-label">Apprenant(s) à inscrire</label>
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
          </nord-stack>
        </nord-stack>

        <nord-stack v-else>
          <nord-stack>
            <label class="n-label">{{ teachersNumber }} {{ teachersLabel }} :</label>

            <nord-stack>
              <nord-stack
                  v-for="teacher in form.teachers"
                  :key="teacher.id"
                  align-items="center"
                  direction="horizontal"
              >
                <nord-avatar size="m"/>
                {{ teacher.full_name }}
              </nord-stack>
            </nord-stack>
          </nord-stack>

          <nord-stack>
            <label class="n-label">{{ learnersNumber }} {{ learnersLabel }} :</label>

            <nord-stack direction="horizontal" gap="xxl" justify-content="space-between">
              <nord-stack align-items="center">
                <nord-badge variant="success">
                  <nord-icon slot="icon" name="text-list"></nord-icon>
                  Membres de cette promo
                </nord-badge>
                <nord-stack
                    v-for="learner in filteredPromotionLearners"
                    :key="learner.id"
                    direction="horizontal"
                    justify-content="start"
                >
                  <nord-avatar size="m"/>
                  {{ learner.full_name }}
                </nord-stack>
              </nord-stack>

              <nord-stack align-items="center">
                <nord-badge variant="danger">
                  <nord-icon slot="icon" name="interface-add"></nord-icon>
                  Autres apprenants
                </nord-badge>
                <nord-stack
                    v-for="learner in filteredOthersLearners"
                    :key="learner.id"
                    direction="horizontal"
                    justify-content="start"
                >
                  <nord-avatar size="m"/>
                  {{ learner.full_name }}
                </nord-stack>
              </nord-stack>
            </nord-stack>
          </nord-stack>
        </nord-stack>
      </nord-stack>
    </nord-stack>

    <nord-stack slot="footer" direction="horizontal" justify-content="end">
      <nord-button expand @click="toggleEditing"> {{ isEditingTimeslot ? 'Annuler' : 'Editer' }}</nord-button>
      <nord-button v-if="isEditingTimeslot" expand value="add" variant="primary">
        Enregistrer
      </nord-button>
    </nord-stack>
  </nord-modal>
</template>

<style scoped>

</style>
