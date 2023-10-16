<script setup>
import {computed} from "vue";
import {useUserStore} from "@/stores/user.store";
import {useApplicationStore} from "@/stores/application.store";
import router from "@/router";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
})

const form = computed(() => {
  return {
    first_name: props.user?.first_name ?? '',
    last_name: props.user?.last_name ?? '',
    phone_number: props.user?.phone_number ?? '',
    email: props.user?.email ?? '',
    password: '',
  }
})

const userStore = useUserStore()
const applicationStore = useApplicationStore()

const store = async () => {
  applicationStore.clearErrors()
  await userStore.createUser(form.value)
  if (!applicationStore.hasErrors) await router.push({name: 'user-list'})
}

const update = async () => {
  applicationStore.clearErrors()
  await userStore.updateUser(props.user.id, form.value)
  if (!applicationStore.hasErrors) await router.push({name: 'user-list'})
}

const destroy = async () => {
  applicationStore.clearErrors()
  await userStore.deleteUser(props.user.id)
  if (!applicationStore.hasErrors) await router.push({name: 'user-list'})
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

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!user ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!user" expand type="button" variant="danger" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>

<style scoped>

</style>
