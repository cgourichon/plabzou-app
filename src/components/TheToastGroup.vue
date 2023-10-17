<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {computed, ref, watch} from "vue";

const applicationStore = useApplicationStore()

const toasts = ref([]);
const error = computed(() => applicationStore.error)

const removeToast = (index) => {
  toasts.value.splice(index, 1);
}

watch(error, () => {
  if (error.value && error.value) {
    toasts.value.push(error.value)
  }
})
</script>

<template>
  <nord-toast-group v-if="error">
    <nord-toast
        v-for="(error, index) in toasts"
        :key="index"
        variant="danger"
        auto-dismiss="3000"
        @dismiss="removeToast(index)"
    >
      {{ error }}
    </nord-toast>
  </nord-toast-group>
</template>
