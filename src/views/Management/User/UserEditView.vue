<script setup>
import UserForm from "@/components/Form/UserForm.vue";
import {useUserStore} from "@/stores/user.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const userStore = useUserStore()
userStore.resetUser()

onMounted(async () => {
  await userStore.fetchUser(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier un utilisateur</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/utilisateurs">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des utilisateurs
        </nord-button>
      </RouterLink>
    </div>

    <UserForm :user="userStore.user"/>
  </nord-card>
</template>

<style scoped>

</style>
