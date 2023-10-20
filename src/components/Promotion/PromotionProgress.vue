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
          :remaining="promotion.remaining ?? null"
          :total="promotion.duration"
      />
  </div>

  <template v-if="promotion.trainings">
    <h4 class="n-margin-b-m">Formations :</h4>
    <ul>
      <li v-for="training in promotion.trainings"
          :key="training.id"
          class="n-margin-be-s n-margin-is-xl"
      >
        <single-progress
            :name="training.name"
            :percentage="training.percentage"
            :remaining="training.remaining ?? null"
            :total="training.duration"
        />
      </li>
    </ul>
  </template>
</template>

<style scoped>

</style>