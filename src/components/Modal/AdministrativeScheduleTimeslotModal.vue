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
      //form.value.starts_at = currentStartDate
      //form.value.ends_at = currentEndDate
    }
  }
})

const toggleEditing = () => {s
  //initForm()
  if (props.previousEvent && isEditingTimeslot.value) {
    emit('close')
  } else {
    isEditingTimeslot.value = !isEditingTimeslot.value
  }
}

const resetModal = () => {
  isEditingTimeslot.value = false
  //initForm()
  emit('close')
}
/**
const form = computed(() => initForm())

const initForm = () => {
  selectedTraining.value = props.currentEvent?.extendedProps?.timeslot?.training ?? ''
  selectedRoom.value = props.currentEvent?.extendedProps?.timeslot?.room ?? ''
  selectedLearners.value = props.currentEvent?.extendedProps?.timeslot?.learners ?? []
  selectedTeachers.value = props.currentEvent?.extendedProps?.timeslot?.teachers ?? []
  isValidated.value = props.currentEvent?.extendedProps?.timeslot?.is_validated ?? ''

  return {
    training: '',
    room: '',
    starts_at: props.currentEvent?.extendedProps?.timeslot?.starts_at ? getDateTimeWithoutTimeZone(props.currentEvent?.extendedProps?.timeslot?.starts_at) : '',
    ends_at: props.currentEvent?.extendedProps?.timeslot?.ends_at ? getDateTimeWithoutTimeZone(props.currentEvent?.extendedProps?.timeslot?.ends_at) : '',
    is_validated: props.currentEvent?.extendedProps?.timeslot?.is_validated,
    learners: props.currentEvent?.extendedProps?.timeslot?.learners,
    teachers: props.currentEvent?.extendedProps?.timeslot?.teachers,
  }
}**/
</script>

<template>
  <nord-modal :open="props.currentEvent" size="l" @close="resetModal">
    <h2 slot="header">{{ props.currentEvent?.title }}</h2>
    <TimeslotForm :timeslot="props.currentEvent?.extendedProps?.timeslot" @reset="emit('close')"/>
  </nord-modal>
</template>

<style scoped>

</style>
