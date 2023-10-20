<script setup>
import {defineEmits} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";

const authStore = useAuthStore()

const props = defineProps({
  currentEvent: {
    type: Object,
    default: null,
  }
})

const emits = defineEmits(['close'])
</script>

<template>
  <nord-modal :open="props.currentEvent" size="m" @close="emits('close')">
    <h2 slot="header">{{ props.currentEvent?.title }}</h2>

    <nord-stack align-items="start" direction="horizontal" justify-content="space-around">
      <nord-stack>
        <nord-stack v-if="authStore.authenticatedUser">
          <nord-banner v-if="props.currentEvent?.extendedProps?.is_teacher" variant="info">
            Vous êtes le formateur ou faites partie des formateurs
          </nord-banner>
          <nord-banner v-if="props.currentEvent?.extendedProps?.is_learner" variant="info">
            Vous faites partie des apprenants
          </nord-banner>
        </nord-stack>

        <nord-input
            :value="props.currentEvent?.title"
            expand
            label="Formation"
            readonly
        />

        <nord-input
            :value="props.currentEvent?.extendedProps?.timeslot?.training?.courses?.map(
              course => course?.name
              ).join(' - ')"
            expand
            label="Cursus"
            readonly
        />

        <nord-input
            :value="props.currentEvent?.extendedProps?.timeslot?.training?.courses?.map(
              course => course?.promotions?.map(promotion => promotion?.name).join(' - ')
              ).join('')"
            expand
            label="Promotion / Groupe"
            readonly
        />

        <nord-stack direction="horizontal">
          <nord-input
              :value="getFrenchDateTimeWithoutTimeZone(currentEvent?.start)"
              expand
              label="Début"
              readonly
          />
          <nord-input
              :value="getFrenchDateTimeWithoutTimeZone(currentEvent?.end)"
              expand
              label="Fin"
              readonly
          />
        </nord-stack>


        <nord-stack direction="horizontal">
          <nord-input
              :value="props.currentEvent?.extendedProps?.timeslot?.room?.name ?? 'En distanciel'"
              expand
              label="Salle"
              readonly
          />

          <nord-input
              v-if="props.currentEvent?.extendedProps?.timeslot?.room?.building"
              :value="props.currentEvent?.extendedProps?.timeslot?.room?.building?.name"
              expand
              label="Bâtiment"
              readonly
          />

        </nord-stack>

        <nord-input
            v-if="props.currentEvent?.extendedProps?.timeslot?.room?.building"
            :value="props.currentEvent?.extendedProps?.timeslot?.room?.building?.place?.full_address"
            expand
            label="Adresse"
            readonly
        />
      </nord-stack>
    </nord-stack>
  </nord-modal>
</template>

<style scoped>

</style>
