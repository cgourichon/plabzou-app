<script setup>
import {useRoute} from "vue-router";

const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

const route = useRoute()

const editRoute = () => {
  const match = route.path.match(/\/(\d+)\/modifier/)

  if (match && match[1]) {
    return route.path
  } else if (props.params.data.id) {
    return `${route.path}/${props.params.data.id}/modifier`
  }
}
</script>

<template>
  <RouterLink v-if="editRoute" :to="editRoute()">
    <nord-button size="s" variant="primary">
      <nord-icon slot="start" name="interface-edit"/>
      Modifier
    </nord-button>
  </RouterLink>
</template>

<style scoped>

</style>
