<script setup>
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";

defineProps({
  timeslot: {
    type: Object,
    required: true,
  },
})

const filterTeachers = (teachers, timeslotId) => {
  return teachers.filter(teacher => {
    const hasTeacherId = teacher.requests.some(request => request.timeslot_id === timeslotId && request.is_approved_by_teacher === true)

    return hasTeacherId
  })
}
</script>

<template>
  <nord-stack>
    <nord-stack direction="horizontal">
      <nord-stack direction="vertical">
        <nord-stack direction="horizontal">
          <nord-stack gap="s">
            <div class="n-label">Début</div>
            <div class="n-input">{{ getFrenchDateTimeWithoutTimeZone(timeslot.starts_at) }}</div>
          </nord-stack>

          <nord-stack gap="s">
            <div class="n-label">Fin</div>
            <div class="n-input">{{ getFrenchDateTimeWithoutTimeZone(timeslot.ends_at) }}</div>
          </nord-stack>
        </nord-stack>

        <nord-stack>
          <nord-stack gap="s">
            <div class="n-label">Formation</div>
            <div class="n-input">
              {{ timeslot.training.name }}
            </div>
          </nord-stack>

          <template v-if="timeslot.promotions.length > 0">
            <nord-stack gap="s">
              <div class="n-label">Promotions</div>
              <div v-for="promotion in timeslot.promotions" :key="promotion.id" class="n-input">
                {{ promotion.name }}
              </div>
            </nord-stack>
          </template>

          <template v-if="timeslot.room">
            <nord-stack gap="s">
              <div class="n-label">Salle</div>
              <div class="n-input">
                {{ timeslot.room?.name ?? 'Aucune salle' }}
              </div>
            </nord-stack>

            <nord-stack gap="s">
              <div class="n-label">Bâtiment</div>
              <div class="n-input">
                {{ timeslot.room?.building?.name ?? 'Aucun bâtiment' }}
              </div>
            </nord-stack>

            <nord-stack gap="s">
              <div class="n-label">Adresse</div>
              <div class="n-input">
                {{ timeslot.room?.building?.place?.full_address ?? 'Aucune adresse' }}
              </div>
            </nord-stack>
          </template>
        </nord-stack>
      </nord-stack>

      <nord-divider/>

      <nord-stack direction="vertical">
        <template v-if="timeslot.teachers.length > 0">
          <nord-stack gap="s">
            <div class="n-label">Formateur(s)</div>
            <div class="n-grid-2">
              <div v-for="teacher in filterTeachers(timeslot.teachers, timeslot.id)" :key="teacher.id" class="n-input">
                {{ teacher.full_name }}
              </div>
            </div>
          </nord-stack>
        </template>

        <template v-if="timeslot.learners.length > 0">
          <nord-stack gap="s">
            <div class="n-label">Apprenant(s)</div>
            <div class="n-grid-2">
              <div v-for="learner in timeslot.learners" :key="learner.id" class="n-input">
                {{ learner.full_name }}
              </div>
            </div>
          </nord-stack>
        </template>
      </nord-stack>
    </nord-stack>
  </nord-stack>
</template>

<style scoped>

</style>