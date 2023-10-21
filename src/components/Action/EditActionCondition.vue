<script setup>
import EditAction from "@/components/Action/EditAction.vue";
const props = defineProps({
    params: {
        type: Object,
        required: true
    }
})
</script>

<template>
  <span class="n-grid-center" v-if="props.params.data.deleted_at">Annulée</span>
  <EditAction v-else :params="props.params"/>
</template>

<style scoped>

</style>