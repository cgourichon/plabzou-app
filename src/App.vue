<script setup>
import {RouterView} from "vue-router"
import TheNavigation from "@/components/TheNavigation.vue"
import TheHeader from "@/components/TheHeader.vue"
import TheToastGroup from "@/components/TheToastGroup.vue"
import TheSpinner from "@/components/TheSpinner.vue";
import {useApplicationStore} from "@/stores/application.store";

const applicationStore = useApplicationStore()
</script>

<template>
  <nord-layout sticky>
    <TheNavigation/>
    <TheHeader/>

    <nord-stack>
      <TheSpinner v-if="applicationStore.loading"/>
      <RouterView/>
    </nord-stack>

    <TheToastGroup/>
  </nord-layout>
</template>
