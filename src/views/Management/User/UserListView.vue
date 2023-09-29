<script setup>
import {useUserStore} from "@/stores/user.store";
import {onMounted} from "vue";

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUsers()
})
</script>

<template>
  <nord-card class="login-card">
    <h2 slot="header">Liste des utilisateurs</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/utilisateurs/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter un utilisateur
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Téléphone</th>
          <th>Mail</th>
          <th class="n-table-align-right">Modifier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td class="n-table-align-right">
            {{ user.id }}
          </td>
          <td>
            {{ user.first_name }}
          </td>
          <td>
            {{ user.last_name }}
          </td>
          <td>
            {{ user.phone_number }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td class="n-table-align-right">
            Modifier
          </td>
        </tr>
        </tbody>
      </table>
    </nord-table>
  </nord-card>
</template>

<style scoped>

</style>
