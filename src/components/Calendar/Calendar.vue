<script setup>
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import frLocale from '@fullcalendar/core/locales/fr';
import {ref} from "vue";
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";
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
})

const authStore = useAuthStore()

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
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  },
  buttonText: {
    list: 'Liste'
  },
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
    timeslot: timeslot,
  })),
  eventClick: function (info) {
    handleEventClick(info)
  },
}

const selectedEvent = ref(null)

const handleEventClick = (info) => {
  selectedEvent.value = info.event
}

const closeSelecteEvent = () => {
  selectedEvent.value = null
}
</script>

<template>
  <FullCalendar :options="calendarOptions"/>

  <nord-modal :open="selectedEvent" @close="closeSelecteEvent">
    <h2 slot="header">{{ selectedEvent?.title }}</h2>

    <nord-stack>
      <nord-stack>
        <nord-banner v-if="selectedEvent?.extendedProps?.is_teacher" variant="info">
          Vous êtes le formateur ou faites partie des formateurs
        </nord-banner>
      </nord-stack>

      <nord-input
          :value="selectedEvent?.title"
          expand
          label="Formation"
          readonly
      />

      <nord-input
          :value="selectedEvent?.extendedProps?.timeslot?.training?.courses.map(
              course => course?.name
              ).join(' - ')"
          expand
          label="Cursus"
          readonly
      />

      <nord-input
          :value="selectedEvent?.extendedProps?.timeslot?.training?.courses.map(
              course => course?.promotions?.map(promotion => promotion?.name).join(' - ')
              ).join('')"
          expand
          label="Promotion / Groupe"
          readonly
      />

      <nord-stack direction="horizontal">
        <nord-input
            :value="getFrenchDateTimeWithoutTimeZone(selectedEvent?.start)"
            expand
            label="Début"
            readonly
        />
        <nord-input
            :value="getFrenchDateTimeWithoutTimeZone(selectedEvent?.end)"
            expand
            label="Fin"
            readonly
        />
      </nord-stack>

      <nord-input
          :value="selectedEvent?.extendedProps?.timeslot?.room?.building?.place?.full_address"
          expand
          label="Adresse"
          readonly
      />

      <nord-input
          :value="selectedEvent?.extendedProps?.timeslot?.room?.building?.name"
          expand
          label="Bâtiment"
          readonly
      />

      <nord-input
          :value="selectedEvent?.extendedProps?.timeslot?.room?.name"
          expand
          label="Salle"
          readonly
      />
    </nord-stack>

    <nord-button slot="footer" expand @click="closeSelecteEvent">Fermer</nord-button>
  </nord-modal>
</template>

<style scoped>

</style>
