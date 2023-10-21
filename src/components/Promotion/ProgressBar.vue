<script setup>
defineProps({
  params: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <nord-progress-bar
      :value="params.value"
      max="100"
  />
</template>

<style scoped>
nord-progress-bar[value="100"] {
  --n-progress-color: var(--n-color-status-success);
}
</style>
