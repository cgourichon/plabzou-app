<script setup>
import {onMounted} from "vue";
import {useCourseStore} from "@/stores/course.store";

const courseStore = useCourseStore()
courseStore.resetCourses()

onMounted(async () => {
  await courseStore.fetchCourses()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des cursus</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/cursus/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un cursus
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th class="n-table-align-right">Modifier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="course in courseStore.courses" :key="course.id">
          <td class="n-table-align-right">
            {{ course.id }}
          </td>
          <td>
            {{ course.name }}
          </td>
          <td class="n-table-align-right">
            <RouterLink :to="`/gestion/cursus/${course.id}/modifier`">
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
