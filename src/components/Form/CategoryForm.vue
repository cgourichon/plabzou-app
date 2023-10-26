<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useCategoryStore} from "@/stores/category.store";
import router from "@/router";
import {computed, ref} from "vue";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  category: {
    type: Object,
    default: null,
  }
})

const categoryStore = useCategoryStore()
const applicationStore = useApplicationStore()

const destroyModalOpened = ref(false)

const form = computed(() => {
  return {
    name: props.category?.name ?? '',
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await categoryStore.createCategory(form.value)
  await redirect()
}

const update = async () => {
  applicationStore.clearErrors()
  await categoryStore.updateCategory(props.category.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await categoryStore.deleteCategory(props.category.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'categories-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}
</script>

<template>
  <form @submit.prevent="!!category ? update() : store()">
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
          {{ !!category ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!category" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>

<style scoped>

</style>
