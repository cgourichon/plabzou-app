<script setup>
import TimeslotForm from "@/components/Form/TimeslotForm.vue";
import {useTimeslotStore} from "@/stores/timeslot.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const timeslotStore = useTimeslotStore()
timeslotStore.resetTimeslot()

onMounted(async () => {
  await timeslotStore.fetchTimeslot(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier un créneau</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/creneaux">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des créneaux
        </nord-button>
      </RouterLink>
    </div>

    <TimeslotForm :timeslot="timeslotStore.timeslot" name="timeslots-list"/>
  </nord-card>
</template>

<style scoped>

</style>
