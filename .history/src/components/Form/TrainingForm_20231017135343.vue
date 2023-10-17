<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTrainingStore} from "@/stores/training.store";
import router from "@/router";
import {computed} from "vue";
import Multiselect from "vue-multiselect";
import {UseCategoryStore} from "@/stores/category.store";

const props = defineProps({
  training: {
    type: Object,
    default: null,
  }
})
 
// TODO : intégration des cursus et formateur

const trainingStore = useTrainingStore()
const categoryStore = UseCategoryStore()
const applicationStore = useApplicationStore()

const form = computed(() => {
  return {
    name: props.training?.name ?? '',
    duration: props.training?.duration ?? 0,
    categories: props.training?.categories ?? [],
    teachers: props.training?.teachers ?? [],
    courses: props.training?.courses ?? [],
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await trainingStore.createTraining(form.value)
  await redirect()
}

const update = async () => {
  applicationStore.clearErrors()
  await trainingStore.updateTraining(props.training.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await trainingStore.deleteTraining(props.training.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'categories-list'})
}
</script>

<template>
  <form @submit.prevent="!!training ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.name"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <nord-input
          v-model="form.duration"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!training ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!training" expand type="button" variant="danger" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
