<script setup>
import {useAuthStore} from "@/stores/auth.store";

const authStore = useAuthStore();
const latestMessage = conversation => {
    //TODO replace by function to find the lastOne
    return conversation.messages[0]
}

const formatDate = date => {
    return date;
}

</script>

<template>
  <nord-card padding="m">
      <div id="conversation-list">
          <template v-for="conversation in authStore.authenticatedUser.conversations"
                    :key="conversation.id">
              <div>{{conversation.name}}</div>
              <div>{{latestMessage(conversation).message}}</div>
              <div>{{latestMessage(conversation).created_at}}</div>
          </template>
      </div>
      <div id="conversation-details">

      </div>
  </nord-card>
</template>

<style scoped>

</style>