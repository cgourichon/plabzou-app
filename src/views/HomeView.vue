<script setup>
import MyPlanning from "@/components/Planning/MyPlanning.vue";
import AdministrativeEmployeeHome from "@/components/Promotion/AdministrativeEmployeeHome.vue";
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore()
</script>

<template>
  <AdministrativeEmployeeHome v-if="authStore.authenticatedUser?.administrative_employee" />
  <MyPlanning v-else />
</template>
