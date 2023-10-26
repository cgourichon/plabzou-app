<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useTrainingStore} from "@/stores/training.store";
import {useCategoryStore} from "@/stores/category.store";
import {useCourseStore} from "@/stores/course.store";
import {useTeacherStore} from "@/stores/teacher.store";
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  training: {
    type: Object,
    default: null,
  }
})

// TODO : intégration des formateurs

const trainingStore = useTrainingStore()
const categoryStore = useCategoryStore()
const courseStore = useCourseStore()
const teacherStore = useTeacherStore()
const applicationStore = useApplicationStore()

const selectedCategories = ref(null)
const selectedCourses = ref(null)
const selectedTeachers = ref(null)
const destroyModalOpened = ref(false)

const form = computed(() => {
  selectedCategories.value = props.training?.categories ?? []
  selectedCourses.value = props.training?.courses ?? []
  selectedTeachers.value = props.training?.teachers ?? []

  return {
    name: props.training?.name ?? null,
    duration: props.training?.duration ?? null,
    categories: props.training?.categories ?? [],
    teachers: props.training?.teachers ?? [],
    courses: props.training?.courses ?? [],
  }
})

const store = async () => {
  form.value.categories = selectedCategories.value
  form.value.courses = selectedCourses.value
  form.value.teachers = selectedTeachers.value

  applicationStore.clearErrors()
  await trainingStore.createTraining(form.value)
  await redirect()
}

const update = async () => {
  form.value.categories = selectedCategories.value
  form.value.courses = selectedCourses.value
  form.value.teachers = selectedTeachers.value

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
  if (!applicationStore.hasErrors) await router.push({name: 'trainings-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  await courseStore.fetchCourses()
  await teacherStore.fetchTeachers()
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
          type="number"
      />

      <label class="n-label">Catégories</label>
      <multi-select
          v-model="selectedCategories"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :hide-selected="true"
          :multiple="true"
          :options="categoryStore.categories"
          :select-label="null"
          :show-no-results="true"
          label="name"
          placeholder="Associer cette formation a des catégories"
          track-by="id"
      >
        <template #noResult>Aucune catégorie correspondante</template>
        <template #noOptions>Pas de catégories...</template>
      </multi-select>

      <label class="n-label">Cursus</label>
      <multi-select
          v-model="selectedCourses"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :hide-selected="true"
          :multiple="true"
          :options="courseStore.courses"
          :select-label="null"
          :show-no-results="true"
          label="name"
          placeholder="Associer des cursus à cette formation"
          track-by="id"
      >
        <template #noResult>Aucun cursus correspondant</template>
        <template #noOptions>Pas de cursus...</template>
      </multi-select>

      <label class="n-label">Formateurs habilité</label>
      <multi-select
          v-model="selectedTeachers"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :hide-selected="true"
          :multiple="true"
          :options="teacherStore.teachers"
          :select-label="null"
          :show-no-results="true"
          label="full_name"
          placeholder="Associer des formateurs à cette formation"
          track-by="user_id"
      >
        <template #noResult>Aucun formateur correspondant</template>
        <template #noOptions>Pas de formateur...</template>
      </multi-select>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!training ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!training" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>
