<script setup>
  import {usePromotionStore} from "@/stores/promotion.store";
  import {computed, onMounted, ref} from "vue";
  import Calendar from "@/components/Calendar/Calendar.vue";
  import {useTimeslotStore} from "@/stores/timeslot.store";

  const promotionStore = usePromotionStore()
  const timeslotStore = useTimeslotStore()

  const props = defineProps({
    id: {
      type: Number,
      default: null,
    },
  })

  const selectedPromotion = ref(null)

  onMounted(async () => {
    await promotionStore.fetchPromotions()

    if (props.id) {
      selectedPromotion.value = await promotionStore.fetchPromotion(props.id)
    }

    await fetchTimeslots()
  })

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
    <h2 slot="header">Planning d'une promotion</h2>
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

</template>

<style scoped>

</style>