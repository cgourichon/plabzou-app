<script setup>
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import {useApplicationStore} from "@/stores/application.store";
import {useCourseStore} from "@/stores/course.store";
import {useTrainingStore} from "@/stores/training.store";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const courseStore = useCourseStore()
const trainingStore = useTrainingStore()
const applicationStore = useApplicationStore()

const props = defineProps({
  course: {
    type: Object,
    default: null,
  }
})

const selectedTrainings = ref(null)
const destroyModalOpened = ref(false)

onMounted(async () => {
  await trainingStore.fetchTrainings()
})

const form = computed(() => {
  selectedTrainings.value = props.course?.trainings ?? []

  return {
    name: props.course?.name ?? '',
    trainings: props.course?.trainings ?? []
  }
})

const store = async () => {
  form.value.trainings = selectedTrainings.value

  applicationStore.clearErrors()
  await courseStore.createCourse(form.value)
  await redirect()
}

const update = async () => {
  form.value.trainings = selectedTrainings.value

  applicationStore.clearErrors()
  await courseStore.updateCourse(props.course.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await courseStore.deleteCourse(props.course.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'courses-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}
</script>

<template>
  <form @submit.prevent="!!course ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.name"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <label class="n-label">Formations disponibles</label>
      <multi-select
          v-model="selectedTrainings"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :hide-selected="true"
          :multiple="true"
          :options="trainingStore.trainings"
          :select-label="null"
          :show-no-results="true"
          label="name"
          track-by="id"
      >
        <template #noResult>Aucune formation correspondante</template>
        <template #noOptions>Pas de formations...</template>
      </multi-select>
      <div
          v-if="applicationStore.errors?.trainings"
          class="n-error"
          role="alert"
      >
        {{ applicationStore.errors?.trainings[0] }}
      </div>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!course ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!course" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
