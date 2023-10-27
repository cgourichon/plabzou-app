<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useTeacherStore} from "@/stores/teacher.store";
import {useApplicationStore} from "@/stores/application.store";
import router from "@/router";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  }
})

const userStore = useUserStore()
const learnerStore = useLearnerStore()
const teacherStore = useTeacherStore()
const applicationStore = useApplicationStore()

const statuses = computed(() => teacherStore.teacher_statuses)
const modes = computed(() => learnerStore.learner_modes)

const destroyModalOpened = ref(false)

onMounted(async () => {
  await teacherStore.fetchTeacherStatuses()
  await learnerStore.fetchLearnerModes()
})

const isAdministrativeEmployee = ref(false)
const isTeacher = ref(false)
const isLearner = ref(false)

const form = computed(() => {
  return getUpdatedForm()
})

const getUpdatedForm = () => {
  const userForm = {
    first_name: (props.user?.first_name || form?.value?.first_name) ?? '',
    last_name: (props.user?.last_name || form?.value?.last_name) ?? '',
    phone_number: (props.user?.phone_number || form?.value?.phone_number) ?? '',
    email: (props.user?.email || form?.value?.email) ?? '',
    password: form?.value?.password ?? '',
  }

  if (isAdministrativeEmployee.value) {
    userForm.is_super_admin = (props.user?.administrative_employee?.is_super_admin || form?.value?.is_super_admin) ?? false
  }

  if (isTeacher.value) {
    userForm.teacher_status = (props.user?.teacher?.status || form?.value?.teacher_status) ?? null
  }

  if (isLearner.value) {
    userForm.learner_mode = (props.user?.learner?.mode.id || form?.value?.learner_mode) ?? null
  }

  return userForm
}

watch([isAdministrativeEmployee, isTeacher, isLearner], ([newIsAdministrativeEmployee, newIsTeacher, newIsLearner]) => {
  isAdministrativeEmployee.value = newIsAdministrativeEmployee
  isTeacher.value = newIsTeacher
  isLearner.value = newIsLearner
})

watch(() => props.user, (newUser) => {
  if (newUser) {
    isAdministrativeEmployee.value = !!newUser.administrative_employee
    isTeacher.value = !!newUser.teacher
    isLearner.value = !!newUser.learner
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await userStore.createUser(form.value)
  await redirect()
}

const update = async () => {
  applicationStore.clearErrors()
  await userStore.updateUser(props.user.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await userStore.deleteUser(props.user.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'users-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}
</script>

<template>
  <form @submit.prevent="!!user ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.first_name"
          :error="applicationStore.errors?.first_name"
          expand
          label="Prénom"
          placeholder="Entrez un prénom"
          type="text"
      />

      <nord-input
          v-model="form.last_name"
          :error="applicationStore.errors?.last_name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <nord-input
          v-model="form.phone_number"
          :error="applicationStore.errors?.phone_number"
          expand
          label="Téléphone"
          placeholder="Entrez un numéro de téléphone"
          type="text"
      />

      <nord-input
          v-model="form.email"
          :error="applicationStore.errors?.email"
          expand
          label="Adresse mail"
          placeholder="Entrez une adresse mail"
          type="email"
      />

      <nord-input
          v-model="form.password"
          :error="applicationStore.errors?.password"
          expand
          label="Mot de passe"
          placeholder="Entrez un mot de passe"
          type="password"
      />

      <nord-fieldset label="Types de l'utilisateur">
        <nord-stack>
          <nord-checkbox
              v-model="isAdministrativeEmployee"
              :checked="isAdministrativeEmployee"
              label="Employé administratif"
              name="user_types"
              type="checkbox"
          />

          <nord-checkbox
              v-model="isTeacher"
              :checked="isTeacher"
              label="Formateur"
              name="user_types"
              type="checkbox"
          />

          <nord-checkbox
              v-model="isLearner"
              :checked="isLearner"
              label="Apprenant"
              name="user_types"
              type="checkbox"
          />
        </nord-stack>
      </nord-fieldset>

      <template v-if="isAdministrativeEmployee">
        <nord-fieldset label="Administrateur">
          <nord-checkbox
              v-model="form.is_super_admin"
              :checked="form.is_super_admin"
              :error="applicationStore.errors?.is_super_admin"
              label="Est un administrateur"
              type="checkbox"
          />
        </nord-fieldset>
      </template>

      <template v-if="isTeacher">
        <nord-select
            v-model="form.teacher_status"
            :error="applicationStore.errors?.teacher_status"
            expand
            label="Statut"
        >
          <option :value="null">Choisir un statut</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
        </nord-select>
      </template>

      <template v-if="isLearner">
        <nord-select
            v-model="form.learner_mode"
            :error="applicationStore.errors?.learner_mode"
            expand
            label="Mode"
        >
          <option :value="null">Choisir un mode</option>
          <option v-for="mode in modes" :key="mode.id" :value="mode.id">{{ mode.name }}</option>
        </nord-select>
      </template>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!user ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!user" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
