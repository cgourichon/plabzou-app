<script setup>
import {useApplicationStore} from "@/stores/application.store";
import TimeslotForm from "@/components/Form/TimeslotForm.vue";

const applicationStore = useApplicationStore()

const props = defineProps({
  currentEvent: {
    type: Object,
    default: null,
  },
  promotion: {
    type: Object,
    default: null,
  }
})

const emit = defineEmits(['close'])

const resetModal = () => {
  emit('close')
}
</script>

<template>
  <nord-modal :open="!!props.currentEvent" size="l" @close="resetModal">
    <h2 slot="header">{{ props.currentEvent?.title ?? 'Nouveau créneau' }}</h2>
    <TimeslotForm
        :from-calendar="true"
        :new-ends-at="props.currentEvent?.end"
        :new-starts-at="props.currentEvent?.start"
        :timeslot="props.currentEvent?.extendedProps?.timeslot"
        @reset="emit('close')"
    />
  </nord-modal>
</template>

<style scoped>

</style>
