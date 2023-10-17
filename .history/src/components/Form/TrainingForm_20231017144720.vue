<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTrainingStore} from "@/stores/training.store";
import {useCategoryStore} from "@/stores/category.store";
import router from "@/router";
import {computed, onMounted} from "vue";
import Multiselect from "vue-multiselect";

const props = defineProps({
  training: {
    type: Object,
    default: null,
  }
})
 
// TODO : intégration des cursus et formateurs

const trainingStore = useTrainingStore()
const categoryStore = useCategoryStore()
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

const options = [1,2,3]

const value = computed(() => 1)

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

onMounted(async () => {
  await categoryStore.fetchCategories()
})
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
          :error="applicationStore.errors?.duration"
          expand
          label="Durée"
          placeholder="Entrez un nombre de minute"
          type="nulmber"
      />
      
      <label>Catégories</label>
      <Multiselect v-model="form.categories"
        track-by="id"
        label="name"
        placeholder="Associer cette formation a des catégories"
        :options="categoryStore.categories"
        :multiple="true"
        :allow-empty="true"
        :hide-selected="true"
        :show-no-results="true">
        <template #noResult>Aucune catégorie correspondante</template>
        <template #noOptions>Pas de catégories...</template>
      </Multiselect>
  

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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

</style>
