<script setup>
import {computed, reactive, ref} from "vue";
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import frLocale from '@fullcalendar/core/locales/fr';
import TimeslotModal from "@/components/Modal/ScheduleTimeslotModal.vue";
import {useAuthStore} from "@/stores/auth.store";

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

const authStore = useAuthStore()

const emits = defineEmits(['resetEvents'])

const state = reactive({
  selectedEvent: null,
})

const handleEventClick = (event) => {
  state.selectedEvent = event.event
}

const handleDateClick = (event) => {
  state.selectedEvent = {
    start: event.date,
    end: new Date(event.date.getTime() + 30 * 60000),
  }
}

const closeSelectedEvent = () => {
  state.selectedEvent = null
  emits('resetEvents')
}

const calendarOptions = computed(() => ({
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
  eventStartEditable: true,
  eventResizableFromStart: true,
  eventDurationEditable: true,
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
  multiMonthMaxColumns: 2,
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
    is_teacher: timeslot.teachers.some(teacher => teacher.user_id === authStore.authenticatedUser?.teacher?.id),
    is_learner: timeslot.learners.some(learner => learner.user_id === authStore.authenticatedUser?.teacher?.id),
    timeslot: timeslot,
  })),
  eventClick: (info) => handleEventClick(info),
  eventDrop: (info) => handleEventClick(info),
  eventResize: (info) => handleEventClick(info),
  dateClick: (info) => handleDateClick(info),
}))
</script>

<template>
  <FullCalendar :options="calendarOptions"/>

  <template v-if="state.selectedEvent">
    <TimeslotModal
        :currentEvent="state.selectedEvent"
        @close="closeSelectedEvent"
    />
  </template>
</template>

<style scoped>

</style>
