<script setup>
import {computed, onMounted, ref} from "vue";

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
    type: Array,
    required: true,
  },
  promotion: {
    type: Object,
    required: false
  }
})

const selectedEvent = ref(null)
const previousEvent = ref(null)
const isAdministrativeEmployee = ref(null)

onMounted(async () => {
  isAdministrativeEmployee.value = !!authStore.authenticatedUser.administrative_employee
})

const handleEvent = (info) => {
  selectedEvent.value = info.event
  previousEvent.value = info.oldEvent
}

const resetselectedEvent = () => {
  selectedEvent.value = null
  previousEvent.value = null
}

const shownEvents = computed(() => props.events?.map(timeslot => ({
  id: timeslot.id,
  title: timeslot.training.name,
  start: timeslot.starts_at,
  end: timeslot.ends_at,
  color: timeslot.is_validated ? 'rgb(29, 134, 51)' : 'rgb(210, 64, 35)',
  is_teacher: timeslot.teachers.some(teacher => teacher.user_id === authStore.authenticatedUser.id),
  is_learner: timeslot.learners.some(learner => learner.user_id === authStore.authenticatedUser.id),
  timeslot: timeslot,
})))

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
  events: shownEvents,
  eventClick: function (info) {
    handleEvent(info.event)
  },
  eventDrop(info) {
    handleEvent(info)
  },
  eventResizeStop({event}) {
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
                      :selectedEvent="selectedEvent" :previousEvent="previousEvent" :promotion="promotion"
                      @close="resetselectedEvent"/>

  <TimeslotModal v-else :selectedEvent="selectedEvent" @close="resetselectedEvent"/>
</template>

<style scoped>

</style>
