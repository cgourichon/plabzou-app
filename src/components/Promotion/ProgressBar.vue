<script setup>
const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <nord-progress-bar
        :value="props.params.value"
        max="100"
    />
  </div>
</template>

<style scoped>

</style>