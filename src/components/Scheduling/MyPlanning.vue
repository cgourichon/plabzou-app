<script setup>
import Calendar from "@/components/Scheduling/Calendar.vue";
import {useTeacherStore} from "@/stores/teacher.store";
import {onMounted, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import {useLearnerStore} from "@/stores/learner.store";

const authStore = useAuthStore()
const teacherStore = useTeacherStore()
const learnerStore = useLearnerStore()
const planning = ref(null)
const showTrainingsToFollow = ref(true)
const isTeacher = ref(false)
const isLearner = ref(false)

const fetchTimeslots = async () => {
  planning.value = null
  let teacherTimeslots = []
  let learnerTimeslots = []

  if (!!authStore.authenticatedUser?.teacher) {
    isTeacher.value = true
    await teacherStore.fetchTeacher(authStore.authenticatedUser.id)
    teacherTimeslots = teacherStore.teacher?.timeslots.filter(timeslot => {
      if (!timeslot.requests) return false

      const hasTeacherId = timeslot.requests.some(request => request.teacher_id === authStore.authenticatedUser.id)
      const isApprovedOrNotHandled = timeslot.requests.every(request => request.is_approved_by_teacher === true || request.is_approved_by_teacher === null)

      return hasTeacherId && isApprovedOrNotHandled
    })
  }

  if (showTrainingsToFollow.value && !!authStore.authenticatedUser?.learner) {
    isLearner.value = true
    await learnerStore.fetchLearner(authStore.authenticatedUser?.id)
    learnerTimeslots = learnerStore.learner?.timeslots
  }

  planning.value = [...teacherTimeslots, ...learnerTimeslots]
}

onMounted(async () => {
  await fetchTimeslots()
})

watch(showTrainingsToFollow, async () => {
  await fetchTimeslots()
})
</script>

<template>
  <template v-if="isTeacher || isLearner">
    <nord-card>
      <h2 slot="header">Mon planning de formations</h2>
      <nord-stack>
        <div>
          <nord-toggle
              v-model="showTrainingsToFollow"
              :checked="showTrainingsToFollow"
              :disabled="!isTeacher && isLearner"
              label="Afficher les formations à suivre"
              size="s"
              type="checkbox"
          />
        </div>
      </nord-stack>
    </nord-card>

    <Calendar v-if="planning" :events="planning"/>
  </template>
</template>

<style scoped>

</style>
