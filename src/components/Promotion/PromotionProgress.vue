<script setup>
import SingleProgress from "@/components/Promotion/SingleProgress.vue";

defineProps({
  promotion: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <single-progress
      :percentage="promotion.percentage"
      :remaining="promotion.remaining ?? null"
      :total="promotion.duration"
      name="Global"
  />

  <template v-if="promotion.trainings">
    <h4 class="n-margin-b-m">Formations :</h4>

    <section class="n-grid-2">
      <template v-for="training in promotion.trainings" :key="training.id">
        <div>
          <single-progress
              :name="training.name"
              :percentage="Number(training.percentage)"
              :remaining="training.remaining ?? null"
              :total="training.duration"
          />
        </div>
      </template>
    </section>
  </template>
</template>

<style scoped>

</style>
