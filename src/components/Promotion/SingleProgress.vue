<script setup>
import ProgressBar from "@/components/Promotion/ProgressBar.vue";

const formatRemaining = () => {
  let string = ''
  const hours = Math.floor(props.remaining / 60)
  const minutes = props.remaining % 60

  if (hours) {
    string += hours + ' heure'
    if (hours > 1) string += 's'
    string += ' et '
  }

  string += minutes + ' minute'
  if (minutes > 1) string += 's'

  return string
};

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  remaining: {
    type: Number,
    required: false
  },
  total: {
    type: Number,
    required: true
  },
})
</script>

<template>
  <nord-stack gap="s">
    <p>
      <span class="n-font-weight-heading">{{ name + ' : ' }}</span>
      <span>{{ percentage + '% - A planifier : ' + (percentage < 100 ? formatRemaining() : 'Terminé') }}</span>
    </p>
    <progress-bar :params="{value: percentage}"/>
  </nord-stack>
</template>

<style scoped>

</style>
