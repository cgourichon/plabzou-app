<script setup>
import {useTrainingStore} from "@/stores/training.store";
import {onMounted} from "vue";

const trainingStore = useTrainingStore()
trainingStore.resetTrainings()

onMounted(async () => {
  await trainingStore.fetchTrainings()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des formations</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/formations/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une formation
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th>Catégories</th>
          <th class="n-table-align-right">Modifier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="training in trainingStore.trainings" :key="training.id">
          <td class="n-table-align-right">
            {{ training.id }}
          </td>
          <td>
            {{ training.name }}
          </td>
          <td>
            {{ training.categories.map(e => e.name).join(' - ') }}
          </td>
          <td class="n-table-align-right">
            <RouterLink :to="`/gestion/formations/${training.id}/modifier`">
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
