<script setup>
import {onMounted, ref} from "vue";

import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import frLocale from '@fullcalendar/core/locales/fr';

import {useAuthStore} from "@/stores/auth.store";
import TimeslotModal from "@/components/Modal/ScheduleTimeslotModal.vue";
import TimeslotAdminModal from "@/components/Modal/AdministrativeScheduleTimeslotModal.vue";
import {getDateTimeWithoutTimeZone} from "@/utils/dayjs";

const authStore = useAuthStore()

const props = defineProps({
  view: {
    type: String,
    required: false,
  },
  events: {
    type: Object,
    required: true,
  },
  promotion: {
    type: Object,
    required: false
  }
})

const emit = defineEmits(['resetEvents'])

const selectedEvent = ref(null)
const previousEvent = ref(null)
const isAdministrativeEmployee = ref(null)

onMounted(async () => {
  await authStore.fetchAuthenticatedUser()

  isAdministrativeEmployee.value = !! authStore.authenticatedUser.administrative_employee
})

const handleEventClick = (event) => {
  selectedEvent.value = event.event
  previousEvent.value = event.oldEvent
}

const closeSelectedEvent = () => {
  emit('resetEvents')
}

const calendarOptions = {
  plugins: [
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    multiMonthPlugin,

  ],
  initialView: props.view || 'timeGridWeek',
  locale: frLocale,
  editable: true,
  selectable: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  buttonText: {
    list: 'Liste'
  },
  weekNumbers: true,
  weekText: 'S',
  allDayText: 'Journée',
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    omitZeroMinute: false,
    meridiem: 'short'
  },
  nowIndicator: true,
  dayMaxEvents: true,
  height: (window.innerHeight - 120),
  events: props.events?.map(timeslot => ({
    id: timeslot.id,
    title: timeslot.training.name,
    start: timeslot.starts_at,
    end: timeslot.ends_at,
    color: timeslot.is_validated ? 'rgb(29, 134, 51)' : 'rgb(210, 64, 35)',
    is_teacher: timeslot.teachers.some(teacher => teacher.user_id === authStore.authenticatedUser.id),
    is_learner: timeslot.learners.some(learner => learner.user_id === authStore.authenticatedUser.id),
    timeslot: timeslot,
  })),
  eventClick: function (info) {
    handleEventClick(info)
  },
  eventDrop(info) {
    handleEventClick(info)
  },
  eventResizeStop({ event }) {
    const start = getDateTimeWithoutTimeZone(event.start.toString())
    const end = getDateTimeWithoutTimeZone(event.end.toString())
    console.log(event.end);
    //TODO: Fuck le calendar
  }
}
</script>

<template>
  <FullCalendar :options="calendarOptions"/>

  <TimeslotAdminModal v-if="isAdministrativeEmployee"
                      :currentEvent="selectedEvent" :previous-event="previousEvent" :promotion="promotion" @close="closeSelectedEvent"/>

  <TimeslotModal v-else :currentEvent="selectedEvent" @close="closeSelectedEvent"/>
</template>

<style scoped>

</style>