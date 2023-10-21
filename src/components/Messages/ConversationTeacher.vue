<script setup>
import {useAuthStore} from "@/stores/auth.store";
import MessageList from "@/components/Messages/MessageList.vue";
import MessageForm from "@/components/Messages/MessageForm.vue";

const authStore = useAuthStore();

</script>
<template>
  <nord-card padding="m">
    <h2 slot="header" class="n-margin-be-s">
      Echange avec le service planning
    </h2>
    <template v-if="authStore.authenticatedUser?.conversations[0]">
      <MessageList :conversation="authStore.authenticatedUser?.conversations[0]"/>
    </template>
    <div v-else>Pas encore de messages échangés avec l'administration, <br>Démarrez la conversation :-)</div>
    <div slot="footer">
      <MessageForm :conversation="authStore.authenticatedUser?.conversations[0]"/>
    </div>
  </nord-card>
</template>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
</style>