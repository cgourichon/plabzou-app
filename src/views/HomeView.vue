<script setup>
import VueMultiselect from 'vue-multiselect'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const selected = null
const options = ['list', 'of', 'options', 'from', 'the', 'server']

const calendarOptions = {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth',
}
</script>

<template>
  <h1>Accueil</h1>

  <div>
    <VueMultiselect
        v-model="selected"
        :options="options">
    </VueMultiselect>
  </div>

  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
