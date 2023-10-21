<script setup>
import RequestForm from "@/components/Form/RequestForm.vue";
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useRequestStore} from "@/stores/request.store";

const requestStore = useRequestStore()
requestStore.clearRequest();

onMounted(async () => {
  await requestStore.fetchRequest(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une demande</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/demandes">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des demandes
        </nord-button>
      </RouterLink>
    </div>

    <RequestForm :request="requestStore.request"/>
  </nord-card>
</template>

<style scoped>

</style>