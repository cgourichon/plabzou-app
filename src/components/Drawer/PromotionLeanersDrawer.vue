<script setup>
defineProps({
  promotion: {
    type: Object,
    default: null,
  }
})
</script>

<template>
  <nord-layout>
    <nord-drawer slot="drawer">
      <nord-header slot="header">
        <h3 class="n-typescale-l n-truncate">{{ promotion?.name }} </h3>
        <nord-button id="close" slot="end" aria-describedby="close-sidebar" size="s" variant="plain">
          <nord-icon name="interface-close" size="s"></nord-icon>
        </nord-button>
        <nord-tooltip id="close-sidebar">Close</nord-tooltip>
      </nord-header>

      <div class="n-typeset">
        <nord-stack direction="vertical">
          <nord-stack
              v-for="learner in promotion?.learners"
              :key="learner.id"
              align-items="center"
              direction="horizontal"
          >
            <nord-avatar size="l"/>
            {{ learner?.full_name }}
          </nord-stack>
        </nord-stack>
      </div>
    </nord-drawer>
  </nord-layout>
</template>

<style scoped>

</style>
