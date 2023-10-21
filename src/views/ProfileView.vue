<script setup>
import {useAuthStore} from "@/stores/auth.store";
import {useUserStore} from "@/stores/user.store";
import {useApplicationStore} from "@/stores/application.store";
import {onMounted, ref} from "vue";

const userStore = useUserStore()
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

const form = ref({})

const update = async () => {
  applicationStore.clearErrors()
  await userStore.updateCurrent(form.value)
  if (!applicationStore.hasErrors) {
    form.value.current_password = null
    form.value.password = null
    form.value.password_confirm = null
  }
}

onMounted(async () => {
  form.value.phone_number = authStore.authenticatedUser.phone_number
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Mon profil</h2>
    <form @submit.prevent="update()">
      <nord-stack>
        <nord-input
            v-model="authStore.authenticatedUser.full_name"
            expand
            label="Nom"
            readonly
            type="text"
        />

        <nord-input
            v-model="authStore.authenticatedUser.email"
            expand
            label="Adresse mail"
            readonly
            type="email"
        />

        <nord-input
            v-model="form.phone_number"
            :error="applicationStore.errors?.phone_number"
            expand
            label="Téléphone"
            placeholder="Entrez un numéro de téléphone"
            type="text"
        />

        <h3>Modification du mot de passe</h3>

        <nord-stack>
          <nord-input
              v-model="form.current_password"
              :error="applicationStore.errors?.current_password"
              expand
              label="Mot de passe actuelle"
              placeholder="Entrez votre mot de passe"
              type="password"
          />

          <nord-input
              v-model="form.password"
              :error="applicationStore.errors?.password"
              expand
              label="Nouveau mot de passe"
              placeholder="Entrez un nouveau mot de passe"
              type="password"
          />

          <nord-input
              v-model="form.password_confirm"
              :error="applicationStore.errors?.password_confirm"
              expand
              label="Confirmez le nouveau mot de passe"
              placeholder="Nouveau mot de passe"
              type="password"
          />
        </nord-stack>

        <nord-stack>
          <nord-button type="submit" variant="primary">
            Modifier
          </nord-button>
        </nord-stack>
      </nord-stack>
    </form>
  </nord-card>
</template>

<style scoped>

</style>