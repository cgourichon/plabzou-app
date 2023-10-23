<script setup>
import {usePromotionStore} from "@/stores/promotion.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import PromotionProgress from "@/components/Promotion/PromotionProgress.vue";
import Calendar from "@/components/Scheduling/Calendar.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useTrainingStore} from "@/stores/training.store";
import {useRoomStore} from "@/stores/room.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {useLearnerStore} from "@/stores/learner.store";
import router from "@/router";

const routeId = useRoute().params.id

const promotionStore = usePromotionStore()
const timeslotStore = useTimeslotStore()
const trainingStore = useTrainingStore()
const roomStore = useRoomStore()
const teacherStore = useTeacherStore()
const learnerStore = useLearnerStore()

timeslotStore.resetTimeslots()
promotionStore.resetPromotions()
trainingStore.resetTrainings()
roomStore.resetRooms()
teacherStore.resetTeachers()
learnerStore.resetLearners()

const selectedPromotion = ref(null)
const modalAdvancement = ref(null)
const calendarReloaded = ref(false)

const showAdvancement = () => {
  modalAdvancement.value.showModal()
}

const filteredTimeslots = computed(() => {
  if (selectedPromotion.value) {
    return timeslotStore?.timeslots.filter(timeslot => timeslot.promotions.find(promotion => promotion.id === selectedPromotion.value.id))
  } else {
    return timeslotStore?.timeslots
  }
})

const fetchDependencies = async () => {
  timeslotStore.resetTimeslots()
  promotionStore.resetPromotions()

  await promotionStore.fetchPromotions({advancement: 1})
  await timeslotStore.fetchTimeslots()
}

const reset = async () => {
  await fetchDependencies()

  if (routeId) {
    selectedPromotion.value = promotionStore.promotions.find(promotion => promotion.id === Number(routeId))
  }
}

onMounted(async () => {
  calendarReloaded.value = false

  await fetchDependencies()

  if (routeId) {
    selectedPromotion.value = promotionStore.promotions.find(promotion => promotion.id === Number(routeId))
  }

  calendarReloaded.value = true
})

watch(() => selectedPromotion.value, () => {
  selectedPromotion.value
      ? router.push({name: 'schedule-promotions', params: {id: selectedPromotion.value.id}})
      : router.push({name: 'schedule-promotions'})
})
</script>

<template>
  <nord-card>
    <h2 slot="header">
      {{ selectedPromotion ? 'Planning de la promotion : ' + selectedPromotion.name : 'Planning des promotions' }}
    </h2>

    <section class="n-grid-2 n-grid-center-i n-container-xs" style="align-items: center;">
      <multi-select
          v-model="selectedPromotion"
          :options="promotionStore.promotions"
          :show-no-results="true"
          label="name"
          placeholder="Sélectionner une promotion"
          track-by="id"
      >
        <template #noResult>Pas de promotions correspondantes</template>
        <template #noOptions>Pas de promotions trouvées</template>
      </multi-select>

      <nord-button v-if="selectedPromotion" variant="primary" @click="showAdvancement">
        <nord-icon name="graph-bars"/>
        Avancement
      </nord-button>
    </section>
  </nord-card>

  <Calendar
      v-if="calendarReloaded"
      :events="filteredTimeslots"
      :promotion=selectedPromotion
      view="dayGridMonth"
      @resetEvents="reset"
  />

  <nord-modal
      v-if="selectedPromotion"
      ref="modalAdvancement"
      :open="false"
      aria-labelledby="title"
      size="l"
  >
    <h2 id="title" slot="header">Promotion : {{ selectedPromotion.name }}</h2>
    <promotion-progress :promotion="selectedPromotion"/>
  </nord-modal>
</template>

<style scoped>

</style>
