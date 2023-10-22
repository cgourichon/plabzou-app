<script setup>
import ImportForm from "@/components/Form/ImportForm.vue";
</script>

<template>
  <nord-card>
    <h2 slot="header">Import des données via Excel</h2>
    <nord-stack>
      <div>
        <h4 class="n-color-text-danger">Attention l'import des données doit se faire dans l'ordre indiqué</h4>
        <h5>Les modalités concernant le contenu des fichiers à importer se trouve dans le mode opératoire</h5>
      </div>
      <div>
        <ImportForm path="/imports/trainings">Formations</ImportForm>
      </div>
      <div>
        <ImportForm path="/imports/teachers">Formateurs</ImportForm>
      </div>
      <div>
        <ImportForm path="/imports/administrative-employees">Employés administratifs</ImportForm>
      </div>
      <div>
        <ImportForm path="/imports/rooms">Salles de formations</ImportForm>
      </div>
      <div>
        <ImportForm path="/imports/promotions">Promotions</ImportForm>
      </div>
      <div>
        <ImportForm path="/imports/learners">Apprenants</ImportForm>
      </div>
    </nord-stack>
  </nord-card>
</template>

<style scoped>

</style>