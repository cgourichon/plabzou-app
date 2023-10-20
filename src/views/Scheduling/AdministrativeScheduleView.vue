<script setup>
import {usePromotionStore} from "@/stores/promotion.store";
import {useTimeslotStore} from "@/stores/timeslot.store";
import PromotionProgress from "@/components/Promotion/PromotionProgress.vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const promotionStore = usePromotionStore()
const timeslotStore = useTimeslotStore()

let selectedPromotion = ref(null)

onMounted(async () => {
  if (useRoute().params.id) {
    console.log(useRoute().params.id)
    await promotionStore.fetchPromotion(useRoute().params.id, {advancement: 1})
    selectedPromotion.value = promotionStore.promotion
  }
  await promotionStore.fetchPromotions()

  await fetchTimeslots()
})

const modalAdvancement = ref(null)

const showAdvancement = () => {
  modalAdvancement.value.showModal()
}

const fetchTimeslots = async () => {
  timeslotStore.resetTimeslots()

  await timeslotStore.fetchTimeslots()
}

const filteredTimeslots = computed(() => {
  let timeslots = timeslotStore?.timeslots

  if (selectedPromotion.value) {
    let filtered = timeslots.filter(timeslot => timeslot.promotions.some(promotion => promotion.id === selectedPromotion.value.id))
    return filtered.length ? filtered : []
  }

  return timeslots
})

const hasTimeslots = computed(() => filteredTimeslots?.value?.length)

</script>

<template>
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
          @update:modelValue="fetchTimeslots"
      >
        <template #noResult>Pas de promotions correspondantes</template>
        <template #noOptions>Pas de promotions trouvées</template>
      </multi-select>
    </nord-stack>
  </nord-card>
  <Calendar v-if="hasTimeslots" :events="filteredTimeslots" :promotion=selectedPromotion view="dayGridMonth"/>

  <nord-modal v-if="selectedPromotion" :open="false" ref="modalAdvancement" size="l" aria-labelledby="title">
    <h2 slot="header" id="title">Promotion : {{ selectedPromotion.name }}</h2>
    <promotion-progress :promotion="selectedPromotion" />
  </nord-modal>
</template>

<style scoped>

</style>