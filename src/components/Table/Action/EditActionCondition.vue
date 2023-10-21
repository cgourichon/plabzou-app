<script setup>
import EditAction from "@/components/Table/Action/EditAction.vue";

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <span v-if="props.params.data.deleted_at" class="n-grid-center">Annulée</span>
  <EditAction v-else :params="props.params"/>
</template>

<style scoped>

</style>