<script setup>
import {useApplicationStore} from "@/stores/application.store";
import {computed, ref, watch} from "vue";

const applicationStore = useApplicationStore()

const toasts = ref([]);

const error = computed(() => applicationStore.error)
const success = computed(() => applicationStore.success)
const hasToasts = computed(() => toasts.value.length)

const removeToast = (index) => {
  toasts.value.splice(index, 1);
}

watch(error, () => {
  if (error.value && error.value) {
    toasts.value.push({
      color: 'danger',
      message: error.value,
      timeout: 3000,
    })
  }
})
watch(success, () => {
  if (success.value && success.value) {
    toasts.value.push({
      color: 'default',
      message: success.value,
      timeout: 2000,
    })
  }
})
</script>

<template>
  <nord-toast-group v-if="hasToasts">
    <nord-toast
        v-for="(toast, index) in toasts"
        :key="index"
        :auto-dismiss="toast.timeout"
        :variant="toast.color"
        @dismiss="removeToast(index)"
    >
      {{ toast.message }}
    </nord-toast>
  </nord-toast-group>
</template>
