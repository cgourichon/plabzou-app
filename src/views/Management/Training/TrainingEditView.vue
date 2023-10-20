<script setup>
import TrainingForm from "@/components/Form/TrainingForm.vue";
import {useTrainingStore} from "@/stores/training.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const trainingStore = useTrainingStore()
trainingStore.resetTraining()

onMounted(async () => {
  await trainingStore.fetchTraining(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une formation</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/formations">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des catégories
        </nord-button>
      </RouterLink>
    </div>

    <TrainingForm :training="trainingStore.training"/>
  </nord-card>
</template>

<style scoped>

</style>
