<script setup>
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";
import router from "@/router";

const form = ref({
  email: '',
  password: '',
})
const validationErrors = ref({})
const errorMessage = ref('')
const authStore = useAuthStore()
const authenticatedUser = computed(() => authStore.authenticatedUser)

const login = async () => {
  try {
    await authStore.login(form.value)

    validationErrors.value = {}
    errorMessage.value = ''

    await router.push({name: 'home'})
  } catch (e) {
    validationErrors.value = e.response.data.errors
    errorMessage.value = e.response.data.message
  }
}
</script>

<template>
  <nord-card class="login-card">
    <h2 slot="header">Connexion</h2>
    <nord-stack v-if="authenticatedUser === null">
      <nord-banner v-if="errorMessage" variant="danger">
        {{ errorMessage }}
      </nord-banner>
      <form @submit.prevent="login">
        <nord-stack>
          <nord-input
              v-model="form.email"
              :error="validationErrors?.email"
              expand
              label="Adresse mail"
              placeholder="Entrez votre adresse mail"
              type="email"
          />
          <nord-input
              v-model="form.password"
              :error="validationErrors?.password"
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
