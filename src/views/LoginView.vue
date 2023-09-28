<script setup>
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import router from "@/router";
import {useApplicationStore} from "@/stores/application.store";

const form = ref({
  email: '',
  password: '',
})
const authStore = useAuthStore()
const applicationStore = useApplicationStore()

const authenticatedUser = computed(() => authStore.authenticatedUser)

const login = async () => {
  await authStore.login(form.value)
  await router.push({name: 'home'})
}
</script>

<template>
  <nord-card class="login-card">
    <h2 slot="header">Connexion</h2>
    <nord-stack v-if="authenticatedUser === null">
      <form @submit.prevent="login">
        <nord-stack>
          <nord-input
              v-model="form.email"
              :error="applicationStore.errors?.email"
              expand
              label="Adresse mail"
              placeholder="Entrez votre adresse mail"
              type="email"
          />

          <nord-input
              v-model="form.password"
              :error="applicationStore.errors?.password"
              expand
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              type="password"
          />

          <nord-button expand type="submit" variant="primary">
            Connexion
          </nord-button>
        </nord-stack>
      </form>
    </nord-stack>
  </nord-card>
</template>

<style scoped>
.login-card {
  width: 480px;
  margin: 0 auto;
}
</style>
