<script setup>
import {getDatetimeShortFormatWithoutTime} from "@/utils/dayjs";
import {computed} from "vue";

const props = defineProps({
  request: {
    type: Object,
    default: null
  }
})

const isOnline = computed(() => props.request.timeslot.room_id ? 'En présentiel' : 'A distance');
const comment = computed(() => props.request.comment);

const getIcon = value => {
  if (value === null) return '<nord-icon class=\'n-color-text-weaker\' name=\'interface-time\'></nord-icon>'
  if (value) return '<nord-icon class=\'n-color-text-success\' name=\'interface-checked-small\'></nord-icon>'
  if (value === false) return '<nord-icon class=\'n-color-text-error\' name=\'interface-close-small\'></nord-icon>'
}
</script>

<template>

  <nord-stack>
    <div>
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Créneau</span> : <span
          class="n-input">{{ request.timeslot.name }}</span></p>
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Mode</span> : <span
          class="n-input">{{ isOnline }}</span></p>
    </div>
    <div class="n-grid-2" v-if="request.timeslot.room?.name">
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Salle</span> : <span
          class="n-input">{{ request.timeslot.room?.name }}</span></p>
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Batiment</span> : <span
          class="n-input">{{ request.timeslot.room?.building?.name }}</span></p>
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Adresse</span> : <span
          class="n-input">{{ request.timeslot.room?.building?.place?.name }} à {{ request.timeslot.room?.building?.place?.city.name }}</span>
      </p>
    </div>
    <div class="n-grid-2">
      <p class=""><span class="n-font-weight-strong">Demandeur</span> : <span
          class="n-input">{{ request.administrative_employee.full_name }}</span></p>
      <p class="n-margin-be-s"><span class="n-font-weight-strong">Date de la demande</span> : <span
          class="n-input">{{ getDatetimeShortFormatWithoutTime(request.created_at) }}</span></p>
    </div>
      <div>
          <nord-textarea v-model="comment" label="Commentaire :" resize="auto" disabled expand>
          </nord-textarea>
      </div>
    <div class="n-grid-2">
      <div class="n-stack n-stack-horizontal n-gap-none">
                <span class="n-stack n-font-weight-strong n-margin-ie-s">
                    Votre réponse :
                </span>
        <span class="n-stack" v-html="getIcon(request.is_approved_by_teacher)"></span>
      </div>
      <div class="n-stack n-stack-horizontal n-gap-none">
                <span class="n-stack n-font-weight-strong n-margin-ie-s">
                    Réponse du service planning :
                </span>
        <span class="n-stack" v-html="getIcon(request.is_approved_by_admin)"></span>
      </div>
    </div>
  </nord-stack>


</template>

<style scoped>

</style>