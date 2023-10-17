<script setup>
import VueMultiselect from 'vue-multiselect'

const selected = null
const options = ['list', 'of', 'options', 'from', 'the', 'server']
</script>

<template>
  <h1>Accueil</h1>

  <div>
    <VueMultiselect
        v-model="selected"
        :options="options">
    </VueMultiselect>
  </div>
</template>
