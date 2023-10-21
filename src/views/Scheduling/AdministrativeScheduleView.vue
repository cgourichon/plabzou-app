<script setup>
  import {usePromotionStore} from "@/stores/promotion.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import PromotionProgress from "@/components/Promotion/PromotionProgress.vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
  import {useTrainingStore} from "@/stores/training.store";
  import {useRoomStore} from "@/stores/room.store";
  import {useTeacherStore} from "@/stores/teacher.store";
  import {useLearnerStore} from "@/stores/learner.store";

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
  const initialLoading = ref(true)
  const loadingPromotion = ref(false)

  const fetchTimeslotsOrPromotion = async () => {
    loadingPromotion.value = true
    if (selectedPromotion.value) await fetchPromotion(selectedPromotion.value.id)
    else await fetchTimeslots()
    loadingPromotion.value = false;
  }

  const showAdvancement = () => {
    modalAdvancement.value.showModal()
  }

  const fetchPromotion = async (id) => {
    loadingPromotion.value = true;
    await promotionStore.fetchPromotion(id, {advancement: 1})
    selectedPromotion.value = promotionStore.promotion
    loadingPromotion.value = false;
  }

  const fetchTimeslots = async () => {
    loadingPromotion.value = true
    await timeslotStore.fetchTimeslots()
    loadingPromotion.value = false
  }

  const filteredTimeslots = computed(() => {
    if (selectedPromotion.value?.timeslots) {
      return selectedPromotion.value.timeslots
    } else {
      return timeslotStore?.timeslots
    }
  })

  onMounted(async () => {
    if (useRoute().params.id) await fetchPromotion(useRoute().params.id)

    await promotionStore.fetchPromotions()
    await timeslotStore.fetchTimeslots()

    initialLoading.value = false
  })
</script>

<template>
  <template v-if="!initialLoading">
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
            @update:modelValue="fetchTimeslotsOrPromotion"
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
        v-if="!loadingPromotion"
        :events="filteredTimeslots"
        :promotion=selectedPromotion
        view="dayGridMonth"
        @resetEvents="fetchTimeslotsOrPromotion"
    />

    <nord-modal
        v-if="selectedPromotion && !loadingPromotion"
        ref="modalAdvancement"
        :open="false"
        aria-labelledby="title"
        size="l"
    >
      <h2 id="title" slot="header">Promotion : {{ selectedPromotion.name }}</h2>
      <promotion-progress :promotion="selectedPromotion"/>
    </nord-modal>
  </template>
</template>

<style scoped>

</style>
