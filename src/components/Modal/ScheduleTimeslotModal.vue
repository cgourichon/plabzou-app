<script setup>
import {ref, watch} from "vue";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";
import {useApplicationStore} from "@/stores/application.store";
import TimeslotForm from "@/components/Form/TimeslotForm.vue";

const applicationStore = useApplicationStore()

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

const isEditingTimeslot = ref(false)

const emit = defineEmits(['close'])

watch(() => props.previousEvent, (newPreviousEvent) => {
  if (newPreviousEvent) {
    let previousStartDate = getDateTimeWithoutTimeZone(newPreviousEvent.start.toString())
    let previousEndDate = getDateTimeWithoutTimeZone(newPreviousEvent.end.toString())
    let currentStartDate = getDateTimeWithoutTimeZone(props.currentEvent.start.toString())
    let currentEndDate = getDateTimeWithoutTimeZone(props.currentEvent.end.toString())

    if (previousStartDate !== currentStartDate || previousEndDate !== currentEndDate) {
      isEditingTimeslot.value = true
    }
  }
})

const toggleEditing = () => {s
  if (props.previousEvent && isEditingTimeslot.value) {
    emit('close')
  } else {
    isEditingTimeslot.value = !isEditingTimeslot.value
  }
}

const resetModal = () => {
  isEditingTimeslot.value = false
  emit('close')
}
</script>

<template>
  <nord-modal :open="!!props.currentEvent" size="l" @close="resetModal">
    <h2 slot="header">{{ props.currentEvent?.title }}</h2>
    <TimeslotForm
        :timeslot="props.currentEvent?.extendedProps?.timeslot"
        :from-calendar="true"
        @reset="emit('close')"
    />
  </nord-modal>
</template>

<style scoped>

</style>
