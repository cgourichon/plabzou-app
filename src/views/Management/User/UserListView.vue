<script setup>
import {useUserStore} from "@/stores/user.store";
import {onMounted} from "vue";
import DataTable from "@/components/Table/DataTable.vue";
import EditAction from "@/components/Table/Action/EditAction.vue";

const userStore = useUserStore()
userStore.resetUsers()

const components = {
  actionsCellRender: EditAction
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    type: "rightAligned",
  },
  {
    field: "first_name",
    headerName: "Prénom",
  },
  {
    field: "last_name",
    headerName: "Nom",
  },
  {
    field: "phone_number",
    headerName: "Téléphone",
  },
  {
    field: "email",
    headerName: "Mail",
  },
  {
    field: "administrative_employee.is_super_admin",
    headerName: "Administrateur",
  },
  {
    field: "administrative_employee",
    headerName: "Employé",
    valueFormatter: ({value}) => value ? 'Oui' : 'Non'
  },
  {
    field: "teacher",
    headerName: "Formateur",
    valueFormatter: ({value}) => value ? 'Oui' : 'Non'
  },
  {
    field: "learner",
    headerName: "Apprenant",
    valueFormatter: ({value}) => value ? 'Oui' : 'Non'
  },
  {
    field: "actions",
    headerName: "Modifier",
    cellRenderer: "actionsCellRender",
  }
]

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

    <DataTable :columns="columns" :components="components" :data="userStore.users"/>
  </nord-card>
</template>

<style scoped>

</style>
