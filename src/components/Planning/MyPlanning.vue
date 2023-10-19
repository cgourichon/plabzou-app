<script setup>
import Calendar from "@/components/Calendar/Calendar.vue";
import {useTeacherStore} from "@/stores/teacher.store";
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore()
const teacherStore = useTeacherStore()
const planning = ref(null)
const showTrainingsToFollow = ref(true)

onMounted(async () => {
  await teacherStore.fetchTeacher(authStore.authenticatedUser.id)
  planning.value = teacherStore.teacher?.timeslots
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Mon planning de formations</h2>
    <nord-stack>
      <div>
        <nord-toggle
            v-model="showTrainingsToFollow"
            :checked="showTrainingsToFollow"
            label="Afficher les formations à suivre"
            size="s"
            type="checkbox"
        />
      </div>
    </nord-stack>
  </nord-card>

  <Calendar v-if="planning" :events="planning"/>
</template>

<style scoped>

</style>
