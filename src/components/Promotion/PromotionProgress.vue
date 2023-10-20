<script setup>
import SingleProgress from "@/components/Promotion/SingleProgress.vue";

const props = defineProps({
  promotion: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
      <single-progress
          name="Global"
          :percentage="promotion.percentage"
          :remaining="promotion.remaining"
          :total="promotion.duration"
      />
  </div>

  <nord-stack>
      <single-progress
          v-for="training in promotion.trainings"
          :key="training.id"
          :name="training.name"
          :percentage="training.percentage"
          :remaining="training.remaining"
          :total="training.duration"
      />
  </nord-stack>
</template>

<style scoped>

</style>