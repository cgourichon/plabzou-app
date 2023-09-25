<script setup>
import {RouterView} from 'vue-router'
import TheNavigation from './components/TheNavigation.vue'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <nord-layout>
    <TheNavigation/>
    <TheHeader/>

    <nord-stack>
      <RouterView/>
    </nord-stack>
  </nord-layout>
</template>
