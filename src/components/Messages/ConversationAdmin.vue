<script setup>
import {useAuthStore} from "@/stores/auth.store";
import MessageList from "@/components/Messages/MessageList.vue";
import {onBeforeUpdate,ref} from "vue";
import MessageForm from "@/components/Messages/MessageForm.vue";
import ConversationItem from "@/components/Messages/ConversationItem.vue";

const authStore = useAuthStore();
const actualConversation = ref(null)

const changeConversation = conversation => actualConversation.value = conversation;

onBeforeUpdate(() => {
    const newConv = authStore.authenticatedUser?.conversations.find(conversation => conversation.id === actualConversation.value?.id);
    changeConversation(newConv);
})

</script>

<template>
    <nord-stack direction="horizontal">
        <div class="w-40">
            <nord-card padding="m">
                <h2 slot="header">Conversations</h2>
                <div slot="header-end">
                    <button type="button" class="n-padding-s">
                        <nord-icon size="s" name="interface-edit-2"></nord-icon>
                    </button>
                </div>
                <section id="conversation-list">
                    <div v-for="conversation in authStore.authenticatedUser.conversations"
                         :key="conversation.id"
                         class="n-margin-be-s"
                         @click="changeConversation(conversation)">
                        <ConversationItem :conversation="conversation" :actual-conversation="actualConversation"/>
                    </div>
                </section>
            </nord-card>
        </div>
        <nord-card>
            <section v-if="actualConversation"
                     class="n-margin-bs-l"
                     :id="`conversation-details-${actualConversation.id}`">
                <MessageList :conversation="actualConversation"></MessageList>
                <MessageForm :conversation="actualConversation"/>
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
</style>