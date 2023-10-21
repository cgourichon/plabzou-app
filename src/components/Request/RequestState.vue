<script setup>
const props = defineProps({
  validated: {
    type: Boolean || null,
    default: null
  }
})
const getIcon = value => {
  if (value === null) return '<nord-icon class=\'n-color-text-weaker\' name=\'interface-time\'></nord-icon>'
  if (value) return '<nord-icon class=\'n-color-text-success\' name=\'interface-checked-small\'></nord-icon>'
  if (value === false) return '<nord-icon class=\'n-color-text-error\' name=\'interface-close-small\'></nord-icon>'
}
</script>

<template>
  <div>
    <div v-if="validated === null">
      <div class="n-stack n-stack-horizontal n-gap-none">
        <span class="n-stack" v-html="getIcon(validated)"></span>
        <span class="n-stack n-margin-is-s">
                    <slot name="who"></slot>
                </span>
      </div>
    </div>
    <template v-else>
      <div class="n-stack n-stack-horizontal n-gap-none">
        <span class="n-stack" v-html="getIcon(validated)"></span>
        <span class="n-stack n-margin-is-s">
                    <slot name="who"></slot>
                </span>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>