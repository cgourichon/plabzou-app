<script setup>
import {ref} from "vue";

const props = defineProps({
  promotion: {
    type: Object,
    default: null,
  }
})

const isOpen = ref(true)

const toggle = () => isOpen.value = !isOpen.value
const close = function() {
  toggle()
}

</script>

<template>
  <nord-layout>
    <nord-drawer slot="drawer" v-if="isOpen">
      <nord-header slot="header">
        <h3 class="n-typescale-l n-truncate">Promo. {{ promotion?.name }} </h3>
        <nord-button slot="end" @click="close" id="close" variant="plain" aria-describedby="close-sidebar" size="s">
          <nord-icon name="interface-close" size="s"></nord-icon>
        </nord-button>
        <nord-tooltip id="close-sidebar">Close</nord-tooltip>
      </nord-header>


      <div class="n-typeset">
        <nord-stack direction="vertical">
          <nord-stack direction="horizontal" align-items="center" v-for="learner in promotion?.learners" :key="learner.id">
            <nord-avatar size="l"/>
            <div>{{ learner?.full_name }} </div>
          </nord-stack>
        </nord-stack>
      </div>
    </nord-drawer>
  </nord-layout>
</template>

<style scoped>

</style>