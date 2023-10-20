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

    string += minutes+' minute'
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
  <section class="n-stack-horizontal n-gap-l ">
    <div class="n-label">
      {{ name }} :
    </div>
    <span>{{ percentage }} %</span>
    <progress-bar :params="{value: percentage}"/>
    <div v-if="percentage < 100" class="n-font-size-s">
       reste {{ formatRemaining() }}
    </div>
  </section>
</template>

<style scoped>

</style>