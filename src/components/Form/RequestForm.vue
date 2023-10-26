<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {onBeforeUpdate, onMounted, ref, watch} from "vue";
import {useTimeslotStore} from "@/stores/timeslot.store";
import TheRadioInput from "@/components/Form/RadioInput.vue";
import {useAuthStore} from "@/stores/auth.store";
import {useRequestStore} from "@/stores/request.store";
import router from "@/router";
import {getFrenchDateTimeWithoutTimeZone} from "@/utils/dayjs";
import {useTeacherStore} from "@/stores/teacher.store";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  request: {
    type: Object,
    default: null,
  }
})

const applicationStore = useApplicationStore();
const timeslotStore = useTimeslotStore();
const authStore = useAuthStore();
const requestStore = useRequestStore();
const teacherStore = useTeacherStore();

const teachers = ref([])
const selectedTimeslot = ref(null)
const selectedTeacher = ref(null)
const isValidatedAdmin = ref('null')
const isValidatedTeacher = ref('null')
const receiveComment = ref(null)
const sendComment = ref(null)
const disabledTeachers = ref(true)
const createdDate = ref(null);
const destroyModalOpened = ref(false)


const changeTeachers = async () => {
  selectedTeacher.value = null;
    await teacherStore.fetchTeachers({training: selectedTimeslot.value.training_id});
    teachers.value = teacherStore.teachers;
}

const assignData = () => {
  return {
    timeslot_id: selectedTimeslot.value?.id,
    teacher_id: selectedTeacher.value?.user_id,
    comment: sendComment.value,
    is_approved_by_admin: getBooleanStatus(isValidatedAdmin.value),
    is_approved_by_teacher: props.request ? getBooleanStatus(isValidatedTeacher.value) : null,
    administrative_employee_id: props.request ? props.request.administrative_employee_id : authStore.authenticatedUser?.id
  }
}

const getBooleanStatus = value => {
  return value === 'true' ? true : value === 'false' ? false : null;
}

const update = async () => {
    applicationStore.clearErrors();
  const data = assignData();
  await requestStore.updateRequest(props.request.id, data);
  await redirect();
}

const store = async () => {
    applicationStore.clearErrors();
    const data = assignData();
  await requestStore.createRequest(data);
  await redirect();
}

const destroy = async () => {
  await requestStore.deleteRequest(props.request.id);
  await redirect();
}

const getDatas = async () => {
  await timeslotStore.fetchTimeslots();
}

const resetTeachers = () => {
  if (selectedTeacher.value) {
    disabledTeachers.value = false;
  } else {
    selectedTeacher.value = null
    disabledTeachers.value = true;
  }
}

const initValues = async () => {
  selectedTimeslot.value = timeslotStore.timeslots.find(timeslot => timeslot.id === props.request.timeslot_id);
  teachers.value = selectedTimeslot.value.teachers;
  selectedTeacher.value = teachers.value.find(teacher => teacher.user_id === props.request.teacher_id);
  isValidatedAdmin.value = props.request.is_approved_by_admin ? 'true' : props.request.is_approved_by_admin === false ? 'false' : 'null';
  isValidatedTeacher.value = props.request.is_approved_by_teacher ? 'true' : props.request.is_approved_by_teacher === false ? 'false' : 'null';
  receiveComment.value = props.request.comment
  createdDate.value = getFrenchDateTimeWithoutTimeZone(props.request.created_at);
  disabledTeachers.value = true;
}

onBeforeUpdate(() => {
  resetTeachers();
})

onMounted(() => {
  getDatas();
})

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'requests-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

watch(() => props.request, async () => {
  await getDatas();
  await initValues();
});

</script>

<template>
  <form @submit.prevent="!!request ? update() : store()">
    <nord-stack>
      <div class="n-stack n-gap-s">
        <label class="n-label">Créneau</label>
        <multi-select
            v-model="selectedTimeslot"
            :disabled="!!props.request"
            :options="timeslotStore.timeslots"
            :show-no-results="true"
            label="name"
            placeholder="Sélectionner un créneau"
            track-by="id"
            @select="changeTeachers"
        >
          <template #noResult>Pas de créneaux correspondants</template>
          <template #noOptions>Pas de créneaux trouvés</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.timeslot_id"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.timeslot_id[0] }}
        </div>
      </div>
      <div class="n-stack n-gap-s">
        <label class="n-label">Formateur</label>
        <multi-select
            v-model="selectedTeacher"
            :disabled="!!props.request || disabledTeachers.value"
            :options="teachers"
            :show-no-results="true"
            label="full_name"
            placeholder="Sélectionner un formateur"
            track-by="user_id"
        >
          <template #noResult>Pas de formateurs correspondants</template>
          <template #noOptions>Pas de formateurs trouvés</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.teacher_id"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.teacher_id[0] }}
        </div>
      </div>

      <div class="n-stack n-gap-s">
        <nord-input v-if="props.request" :value="props.request?.administrative_employee.full_name"
                    disabled
                    expand
                    label="Personnel administratif">
        </nord-input>
      </div>
      <div v-show="!!props.request" class="n-stack n-gap-s">
        <nord-input :value="createdDate"
                    disabled
                    expand
                    label="Demande créé le :">
        </nord-input>
      </div>

      <nord-textarea v-model="receiveComment"
                     :error="applicationStore.errors?.request.comment"
                     character-counter
                     expand
                     disabled
                     label="Commentaire reçu"
                     maxlength="255"
                     placeholder="Ecrivez votre message ici (optionnel)"
                     resize="auto"
                     style="--n-textarea-block-size: 50px">
      </nord-textarea>

        <nord-textarea v-model="sendComment"
                       :error="applicationStore.errors?.request.comment"
                       character-counter
                       expand
                       label="Commentaire sur la demande"
                       maxlength="255"
                       placeholder="Ecrivez votre message ici (optionnel)"
                       resize="auto"
                       style="--n-textarea-block-size: 50px">
        </nord-textarea>

      <nord-stack direction="horizontal" justify-content="">
        <fieldset>
          <legend class="n-label">Etat de la demande du formateur</legend>
          <nord-stack direction="vertical">
            <TheRadioInput v-model="isValidatedTeacher"
                           :item="{label: '<nord-icon class=\'n-color-text-weaker\' name=\'interface-time\'></nord-icon>', disabled: true, value: 'null'}"/>
            <TheRadioInput v-model="isValidatedTeacher"
                           :item="{label: '<nord-icon class=\'n-color-text-success\' name=\'interface-checked-small\'></nord-icon>', disabled: true, value: 'true'}"/>
            <TheRadioInput v-model="isValidatedTeacher"
                           :item="{label: '<nord-icon class=\'n-color-text-error\' name=\'interface-close-small\'></nord-icon>', disabled: true, value: 'false'}"/>
          </nord-stack>
        </fieldset>
        <fieldset>
          <legend class="n-label">Etat de la demande au service administratif</legend>
          <nord-stack direction="vertical">
            <TheRadioInput v-model="isValidatedAdmin"
                           :item="{label: '<nord-icon class=\'n-color-text-weaker\' name=\'interface-time\'></nord-icon>', disabled: false, value: 'null'}"/>
            <TheRadioInput v-model="isValidatedAdmin"
                           :item="{label: '<nord-icon class=\'n-color-text-success\' name=\'interface-checked-small\'></nord-icon>', disabled: false, value: 'true'}"/>
            <TheRadioInput v-model="isValidatedAdmin"
                           :item="{label: '<nord-icon class=\'n-color-text-error\' name=\'interface-close-small\'></nord-icon>', disabled: false, value: 'false'}"/>
          </nord-stack>
        </fieldset>
      </nord-stack>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ request ? 'Modifier' : 'Créer' }}
        </nord-button>

        <nord-button v-if="request" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>

    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

fieldset {
  border: none;
}
</style>