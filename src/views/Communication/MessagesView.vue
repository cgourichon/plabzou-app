<script setup>
import {useAuthStore} from "@/stores/auth.store";
import ConversationTeacher from "@/components/Messages/ConversationTeacher.vue";
import ConversationAdmin from "@/components/Messages/ConversationAdmin.vue";
import {onMounted, onUnmounted} from "vue";
import {useTeacherStore} from "@/stores/teacher.store";

const authStore = useAuthStore();
const teacherStore = useTeacherStore();
teacherStore.fetchTeachers();

const startInterval = setInterval(() => {
  authStore.fetchAuthenticatedUser();
}, 60000)

const stopInterval = startInterval => {
  clearInterval(startInterval);
}

onMounted(() => startInterval);
onUnmounted(() => stopInterval(startInterval));
</script>

<template>
  <template v-if="authStore.authenticatedUser?.teacher">
    <ConversationTeacher/>
  </template>
  <template v-else-if="authStore.authenticatedUser?.administrative_employee">
    <ConversationAdmin/>
  </template>
  <template v-else>
    <p>Rien à afficher ici pour vous :-)</p>
  </template>
</template>

<style scoped>

</style>