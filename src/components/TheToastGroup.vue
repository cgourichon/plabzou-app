<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {computed} from "vue";

const applicationStore = useApplicationStore()

const error = computed(() => applicationStore.error)
</script>

<template>
  <nord-toast-group v-if="error">
    <nord-toast variant="danger" auto-dismiss="3000">
      {{ error }}
    </nord-toast>
  </nord-toast-group>
</template>
