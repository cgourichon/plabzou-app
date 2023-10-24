<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {useCityStore} from "@/stores/city.store";
import router from "@/router";
import {computed} from "vue";

const props = defineProps({
  city: {
    type: Object,
    default: null,
  }
})

const cityStore = useCityStore()
const applicationStore = useApplicationStore()

const form = computed(() => {
  return {
    name: props.city?.name ?? '',
    postcode: props.city?.postcode ?? ''
  }
})

const store = async () => {
  applicationStore.clearErrors()
  await cityStore.createCity(form.value)
  await redirect()
}

const update = async () => {
  applicationStore.clearErrors()
  await cityStore.updateCity(props.city.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await cityStore.deleteCity(props.city.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'cities-list'})
}
</script>

<template>
  <form @submit.prevent="!!city ? update() : store()">
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
          v-model="form.postcode"
          :error="applicationStore.errors?.postcode"
          expand
          label="Code postal"
          placeholder="Entrez un code postal"
          type="text"
      />

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!city ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!city" expand type="button" variant="dashed" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
