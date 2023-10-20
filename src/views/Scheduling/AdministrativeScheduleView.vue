<script setup>
import {useAuthStore} from "@/stores/auth.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {usePromotionStore} from "@/stores/promotion.store";
import {useTrainingStore} from "@/stores/training.store";
import {useRoomStore} from "@/stores/room.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import PromotionProgress from "@/components/Promotion/PromotionProgress.vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const authStore = useAuthStore()
const teacherStore = useTeacherStore()
const learnerStore = useLearnerStore()
const promotionStore = usePromotionStore()
const trainingStore = useTrainingStore()
const roomStore = useRoomStore()
const timeslotStore = useTimeslotStore()

timeslotStore.resetTimeslots()
promotionStore.resetPromotions()

const selectedPromotion = ref(null)
const modalAdvancement = ref(null)
const initialLoading = ref(true)
const loadingPromotion = ref(false)

const selectPromotion = async () => {
  if (selectedPromotion.value) await fetchPromotion(selectedPromotion.value.id)
  else {
    loadingPromotion.value = true;
    setTimeout(() =>loadingPromotion.value = false, 500);
  }
}

const showAdvancement = () => {
  modalAdvancement.value.showModal()
}

const fetchCurrent = async () => {
  if (selectedPromotion.value) await fetchPromotion(selectedPromotion.value.id)
  else await fetchTimeslots()
}

const fetchPromotion = async(id) => {
  loadingPromotion.value = true;
  await promotionStore.fetchPromotion(id, {advancement: 1})
  selectedPromotion.value = promotionStore.promotion
  loadingPromotion.value = false;
}

const fetchTimeslots = async () => {
  loadingPromotion.value = true;
  await timeslotStore.fetchTimeslots()
  loadingPromotion.value = false;
}

const filteredTimeslots = computed(() => {
  if (selectedPromotion.value?.timeslots) {
    return selectedPromotion.value.timeslots
  } else {
    return timeslotStore?.timeslots
  }
})

const hasTimeslots = computed(() => filteredTimeslots?.value?.length)

onMounted(async () => {
  if (useRoute().params.id) await fetchPromotion(useRoute().params.id)

  await promotionStore.fetchPromotions()
  await timeslotStore.fetchTimeslots()
  await trainingStore.fetchTrainings()
  await roomStore.fetchRooms()
  await learnerStore.fetchLearners()
  await teacherStore.fetchTeachers()

  initialLoading.value = false
})
</script>

<template>
  <template v-if="!initialLoading">
    <nord-card>
      <nord-stack slot="header" class="n-stack-horizontal">
        <h2 v-if="!selectedPromotion">Planning des promotions</h2>

        <h2 v-else>Planning de la promotion : {{ selectedPromotion.name }}</h2>
        <nord-button size="s" variant="primary" @click="showAdvancement">
          <nord-icon slot="start" name="interface-edit-on"/>
          Avancement
        </nord-button>
      </nord-stack>

      <nord-stack slot="header-end">
        <multi-select
            v-model="selectedPromotion"
            :options="promotionStore.promotions"
            :show-no-results="true"
            label="name"
            placeholder="Sélectionner une promotion"
            track-by="id"
            @update:modelValue="selectPromotion"
        >
          <template #noResult>Pas de promotions correspondantes</template>
          <template #noOptions>Pas de promotions trouvées</template>
        </multi-select>
      </nord-stack>
    </nord-card>
    <Calendar v-if="hasTimeslots && !loadingPromotion"
              :events="filteredTimeslots"
              :promotion=selectedPromotion
              view="dayGridMonth"
              @resetEvents="fetchCurrent" />

    <nord-modal v-if="selectedPromotion && !loadingPromotion" :open="false" ref="modalAdvancement" size="l" aria-labelledby="title">
      <h2 slot="header" id="title">Promotion : {{ selectedPromotion.name }}</h2>
      <promotion-progress :promotion="selectedPromotion"/>
    </nord-modal>
  </template>
</template>

<style scoped>

</style>