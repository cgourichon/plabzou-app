<script setup>
import {useTimeslotStore} from "@/stores/timeslot.store";
import {onMounted} from "vue";

const timeslotStore = useTimeslotStore()
timeslotStore.resetTimeslots()

onMounted(async () => {
  await timeslotStore.fetchTimeslots()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des créneaux</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/creneaux/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un créneau
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Créneau validé</th>
          <th>Salle</th>
          <th>Formation</th>
          <th>Formateur(s)</th>
          <th>Apprenant(s)</th>
          <th class="n-table-align-right">Modifier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="timeslot in timeslotStore.timeslots" :key="timeslot.id">
          <td class="n-table-align-right">
            {{ timeslot.id }}
          </td>
          <td>
            {{ timeslot.starts_at }}
          </td>
          <td>
            {{ timeslot.ends_at }}
          </td>
          <td>
            {{ timeslot.is_validated ? 'Oui' : 'Non' }}
          </td>
          <td>
            {{ timeslot.room.name }}
          </td>
          <td>
            {{ timeslot.training.name }}
          </td>
          <td>
            {{ Object.keys(timeslot.teachers).length }}
          </td>
          <td>
            {{ Object.keys(timeslot.learners).length }}
          </td>
          <td class="n-table-align-right">
            <RouterLink :to="`/gestion/creneaux/${timeslot.id}/modifier`">
              <nord-button size="s" variant="primary">
                <nord-icon slot="start" name="interface-edit"/>
                Modifier
              </nord-button>
            </RouterLink>
          </td>
        </tr>
        </tbody>
      </table>
    </nord-table>
  </nord-card>
</template>

<style scoped>

</style>
