<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import {useRoomStore} from "@/stores/room.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {usePromotionStore} from "@/stores/promotion.store";
import router from "@/router";
import {computed, onBeforeUpdate, onMounted, ref, watch} from "vue";
import {useTrainingStore} from "@/stores/training.store";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";
import {useAuthStore} from "@/stores/auth.store";

const props = defineProps({
  timeslot: {
    type: Object,
    default: null,
  },
  fromCalendar: {
    type: Boolean,
    default: false,
    required: false,
  },
  newStartsAt: {
    type: Date,
    default: null,
    required: false,
  },
  newEndsAt: {
    type: Date,
    default: null,
    required: false,
  },
})

const emit = defineEmits(['reset'])

const timeslotStore = useTimeslotStore()
const roomStore = useRoomStore()
const trainingStore = useTrainingStore()
const learnerStore = useLearnerStore()
const teacherStore = useTeacherStore()
const promotionStore = usePromotionStore()
const applicationStore = useApplicationStore()
const authStore = useAuthStore()

const selectedTraining = ref(null)
const selectedPromotions = ref(null)
const selectedRoom = ref(null)
const selectedLearners = ref(null)
const selectedTeachers = ref(null)
const timeslotLoaded = ref(false)
const filterLearnersByTraining = ref(true)

const isAdministrativeEmployee = computed(() => !!authStore.authenticatedUser?.administrative_employee)

const form = computed(() => {
  selectedTraining.value = props.timeslot?.training ?? ''
  selectedRoom.value = props.timeslot?.room ?? ''
  selectedLearners.value = props.timeslot?.learners ?? []
  selectedTeachers.value = props.timeslot?.teachers ?? []
  selectedPromotions.value = props.timeslot?.promotions ?? []

  const startsAt = props.newStartsAt ?? props.timeslot?.starts_at
  const endsAt = props.newEndsAt ?? props.timeslot?.ends_at

  return {
    training: '',
    room: '',
    starts_at: startsAt ? getDateTimeWithoutTimeZone(startsAt) : '',
    ends_at: endsAt ? getDateTimeWithoutTimeZone(endsAt) : '',
    is_validated: props.timeslot?.is_validated ?? '',
    learners: [],
    teachers: [],
    promotions: [],
  }
})

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
  if (!applicationStore.hasErrors) {
    props.fromCalendar ? emit('reset') : await router.push({name: 'timeslots-list'})
  }
}

const checkFilterLearnersByTraining = async () => {
  await fetchDependencies()
}

const requestValidated = option => {
    const isValidated = option?.requests.find(request => {
        return request.timeslot_id === props.timeslot?.id && request.is_approved_by_teacher && request.is_approved_by_admin
    });

    return isValidated ? "n-color-status-neutral n-border-radius n-padding-i-xs n-color-text-success" : option?.requests.find(request => request.timeslot_id === props.timeslot?.id && request.is_approved_by_teacher === false) ?
                  "n-color-status-neutral n-border-radius n-padding-i-xs n-color-text-error" : "";

}

const hasApprovedRequest = ref(false);
const checkApprovedRequest = () => {
    hasApprovedRequest.value = props.timeslot?.requests.some(request => request.is_approved_by_teacher && request.is_approved_by_admin);
    return hasApprovedRequest.value
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
  await fetchDependencies()
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

  // Supprimer les apprenants undefined
  selectedLearners.value = selectedLearners.value.filter(learner => !!learner)

  // Supprimer les apprenants en double
  const learners = selectedLearners.value.map(learner => learner.user_id)
  selectedLearners.value = selectedLearners.value.filter((learner, index) => !learners.includes(learner.user_id, index + 1))

  // Si le créneau n'est pas encore chargé, on retire les apprenants qui ne sont pas dans le créneau
  if (!!props.timeslot && !timeslotLoaded.value) {
    selectedLearners.value = selectedLearners.value.filter(learner => props.timeslot.learners.map(learner => learner.user_id).includes(learner.user_id))

    timeslotLoaded.value = true
  }
}, {deep: true})

onMounted(() => {
  roomStore.fetchRooms()
  trainingStore.fetchTrainings()
})

onBeforeUpdate(() => {
    checkApprovedRequest();
});

const nameWithCapacity = ({name, seats_number}) => `${name} : ${seats_number} place(s)`
</script>

<template>
  <form v-if="!!roomStore.rooms" @submit.prevent="!!timeslot ? update() : store()">
    <nord-stack>
      <nord-stack direction="horizontal">
        <nord-stack direction="vertical">
          <nord-stack direction="horizontal">
            <nord-input
                v-model="form.starts_at"
                :error="applicationStore.errors?.starts_at"
                :readonly="!isAdministrativeEmployee"
                expand
                label="Date de début"
                type="datetime-local"
            />

            <nord-input
                v-model="form.ends_at"
                :error="applicationStore.errors?.ends_at"
                :readonly="!isAdministrativeEmployee"
                expand
                label="Date de fin"
                type="datetime-local"
            />
          </nord-stack>

          <div class="n-stack n-gap-s">
            <label class="n-label">Formation</label>
            <multi-select
                v-model="selectedTraining"
                :disabled="!!props.timeslot || !isAdministrativeEmployee"
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
          </div>

          <template v-if="selectedTraining">
            <div class="n-stack n-gap-s">
              <label class="n-label">Promotions</label>
              <multi-select
                  v-model="selectedPromotions"
                  :allow-empty="true"
                  :clear-on-select="true"
                  :close-on-select="false"
                  :disabled="!isAdministrativeEmployee"
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
            </div>

            <div class="n-stack n-gap-s">
              <label class="n-label">Salle</label>
              <multi-select
                  v-model="selectedRoom"
                  :disabled="!isAdministrativeEmployee"
                  :options="roomStore.rooms"
                  :show-no-results="true"
                  :custom-label="nameWithCapacity"
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
            </div>

            <nord-input
                v-if="selectedRoom"
                :value="selectedRoom?.building?.name"
                expand
                label="Bâtiment"
                readonly
            />

            <nord-input
                v-if="selectedRoom"
                :value="selectedRoom?.building?.place?.full_address"
                expand
                label="Adresse"
                readonly
            />
          </template>
        </nord-stack>

        <nord-divider/>

        <nord-stack direction="vertical">
          <template v-if="selectedTraining">
            <div class="n-stack n-gap-s">
              <label class="n-label">Formateurs</label>
              <multi-select
                  v-model="selectedTeachers"
                  :allow-empty="true"
                  :clear-on-select="true"
                  :close-on-select="false"
                  :disabled="!isAdministrativeEmployee"
                  :hide-selected="true"
                  :multiple="true"
                  :options="teacherStore.teachers"
                  :select-label="null"
                  :show-no-results="true"
                  placeholder="Ajouter des formateurs"
                  track-by="user_id"
                  label="full_name"
                  @select="test"
              >
                  <template #tag="{option, remove}">
                          <span id="tag" class="multiselect__tag">
                              <span :class="requestValidated(option)">{{option.full_name}}</span>
                              <i tabindex="1"
                                 id="tag-icon"
                                 class="multiselect__tag-icon"
                                 @click.prevent @mousedown.prevent.stop="remove(option, $event)"
                              ></i>
                          </span>
                  </template>
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

            <div class="n-stack n-gap-s">
              <label class="n-label ">Apprenants</label>
              <multi-select
                  v-model="selectedLearners"
                  :allow-empty="true"
                  :clear-on-select="true"
                  :close-on-select="false"
                  :disabled="!isAdministrativeEmployee"
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
              <div v-if="isAdministrativeEmployee">
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

              <template v-if="hasApprovedRequest">
            <nord-checkbox
                v-model="form.is_validated"
                :disabled="!isAdministrativeEmployee"
                :error="applicationStore.errors?.is_validated"
                label="Créneau validé"
                type="checkbox"
            />
              </template>
          </template>
        </nord-stack>
      </nord-stack>

      <template v-if="isAdministrativeEmployee">
        <nord-divider/>

        <nord-stack direction="horizontal">
          <nord-button expand type="submit" variant="primary">
            {{ !!timeslot ? 'Modifier' : 'Ajouter' }}
          </nord-button>

          <nord-button v-if="!!timeslot" expand type="button" variant="dashed" @click="destroy">
            Supprimer
          </nord-button>
        </nord-stack>
      </template>
    </nord-stack>
  </form>
</template>

<style scoped>
#tag {

}

#tag-icon {
    color: #000000;
}
</style>