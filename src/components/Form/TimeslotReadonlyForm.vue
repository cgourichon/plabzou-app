<script setup>
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";

defineProps({
  timeslot: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <nord-stack>
    <nord-stack direction="horizontal">
      <nord-stack direction="vertical">
        <dl class="n-dl">
          <dt class="n-dt">Début</dt>
          <dd class="n-dd">{{ getFrenchDateTimeWithoutTimeZone(timeslot.starts_at) }}</dd>

          <dt class="n-dt">Fin</dt>
          <dd class="n-dd">{{ getFrenchDateTimeWithoutTimeZone(timeslot.ends_at) }}</dd>
        </dl>

        <dl class="n-dl">
          <dt class="n-dt">Formation</dt>
          <dd class="n-dd">{{ timeslot.training.name }}</dd>

          <dt class="n-dt">Promotions</dt>
          <dd class="n-dd">
            <template v-if="timeslot.promotions.length > 0">
              <ul>
                <li v-for="promotion in timeslot.promotions" :key="promotion.id">
                  {{ promotion.name }}
                </li>
              </ul>
            </template>
            <template v-else>
              Aucune promotion
            </template>
          </dd>

          <dt class="n-dt">Salle</dt>
          <dd class="n-dd">{{ timeslot.room?.name ?? 'Aucune salle' }}</dd>

          <dt class="n-dt">Bâtiment</dt>
          <dd class="n-dd">{{ timeslot.room?.building?.name ?? 'Aucun bâtiment' }}</dd>

          <dt class="n-dt">Adresse</dt>
          <dd class="n-dd">{{ timeslot.room?.building?.place?.full_address ?? 'Aucune adresse' }}</dd>
        </dl>
      </nord-stack>

      <nord-divider/>

      <nord-stack direction="vertical">
        <dl class="n-dl">
          <dt class="n-dt">Formateurs</dt>
          <dd class="n-dd">
            <template v-if="timeslot.teachers.length > 0">
              <ul>
                <li v-for="teacher in timeslot.teachers" :key="teacher.id">
                  {{ teacher.full_name }}
                </li>
              </ul>
            </template>
            <template v-else>
              Aucun formateur
            </template>
          </dd>

          <dt class="n-dt">Apprenants</dt>
          <dd class="n-dd">
            <template v-if="timeslot.learners.length > 0">
              <ul>
                <li v-for="learner in timeslot.learners" :key="learner.id">
                  {{ learner.full_name }}
                </li>
              </ul>
            </template>
            <template v-else>
              Aucun apprenant
            </template>
          </dd>
        </dl>
      </nord-stack>
    </nord-stack>
  </nord-stack>
</template>

<style scoped>

</style>