<script setup>
import {useAuthStore} from "@/stores/auth.store";
import MessageList from "@/components/Messages/MessageList.vue";
import {onBeforeUpdate, ref} from "vue";
import MessageForm from "@/components/Messages/MessageForm.vue";
import ConversationItem from "@/components/Messages/ConversationItem.vue";
import ConversationModal from "@/components/Messages/ConversationModal.vue";

const authStore = useAuthStore();
const actualConversation = ref(null)
const conversationsNumber = ref(authStore.authenticatedUser?.conversations.length);
const changeConversation = conversation => actualConversation.value = conversation;
const findNewConversation = () => authStore.authenticatedUser?.conversations.find(conversation => conversation.id === actualConversation.value?.id);

onBeforeUpdate(() => {
  changeConversation(findNewConversation());

  //Une nouvelle conversation a été créée, on définit la conversation actuelle comme celle-ci
  if (authStore.authenticatedUser?.conversations.length === conversationsNumber.value + 1) {
    actualConversation.value = authStore.authenticatedUser?.conversations[0];
    conversationsNumber.value++;
  }
})

</script>

<template>
  <nord-stack direction="horizontal">
    <div class="w-40">
      <nord-card padding="m">
        <h2 slot="header">Conversations</h2>
        <div slot="header-end">
          <ConversationModal/>
        </div>
        <section id="conversation-list" class="">
          <div v-for="conversation in authStore.authenticatedUser?.conversations"
               :key="conversation.id"
               class="n-margin-be-s"
               @click="changeConversation(conversation)">
            <ConversationItem :actual-conversation="actualConversation" :conversation="conversation"/>
          </div>
        </section>
      </nord-card>
    </div>
    <nord-card>
      <section v-if="actualConversation"
               :id="`conversation-details-${actualConversation.id}`">
        <div class="n-padding-be-m n-font-weight-heading">
          {{ actualConversation.teacher.full_name }}
        </div>
        <div class="n-padding-be-s">
          <nord-divider></nord-divider>
        </div>
        <MessageList :conversation="actualConversation"></MessageList>
        <MessageForm :conversation="actualConversation"/>
      </section>
      <section v-else class="n-align-center n-margin-b-l">
        <p>Cliquez sur un message de la liste pour l'afficher</p>
        <p>ou démarrer une nouvelle conversation</p>
      </section>
    </nord-card>
  </nord-stack>
</template>

<style scoped>
.w-40 {
  width: 40%;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}

button:hover {
  background: #3559c7;
  color: white;
}

#conversation-list {
  overflow-y: scroll;
//height: 40vh; max-height: 60vh;
}
</style>