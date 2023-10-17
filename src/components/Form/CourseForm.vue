<script setup>
import router from "@/router";
import {computed} from "vue";
import {useApplicationStore} from "@/stores/application.store";
import {useCourseStore} from "@/stores/course.store";


const props = defineProps({
  course: {
    type: Object,
    default: null,
  }
})

const courseStore = useCourseStore()
const applicationStore = useApplicationStore()

const form = computed(() => {
  return {
    name: props.course?.name ?? '',
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await courseStore.createCourse(form.value)
  await redirect()
}

const update = async () => {
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

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!course ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!course" expand type="button" variant="danger" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
