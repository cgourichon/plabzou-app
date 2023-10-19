<script setup>
const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="`/gestion/utilisateurs/${params.data.id}/modifier`">
    <nord-button size="s" variant="primary">
      <nord-icon slot="start" name="interface-edit"/>
      Modifier
    </nord-button>
  </RouterLink>
</template>

<style scoped>

</style>
