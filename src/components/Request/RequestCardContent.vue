<script setup>
import RequestState from "@/components/Request/RequestState.vue";

const props = defineProps({
  request: {
    type: Object,
    default: null
  }
})

</script>

<template>
  <nord-stack gap="l">
    <div>{{ request.timeslot.name }}</div>
    <RequestState :validated="request.is_approved_by_teacher">
      <template #wait>En attente de votre part</template>
      <template #who>par vous</template>
    </RequestState>
    <RequestState :validated="request.is_approved_by_admin">
      <template #wait>En attente du service planning</template>
      <template #who>par le service planning</template>
    </RequestState>
  </nord-stack>
</template>

<style scoped>

</style>