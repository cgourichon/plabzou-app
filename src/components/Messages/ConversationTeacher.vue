<script setup>
import {useAuthStore} from "@/stores/auth.store";
import MessageList from "@/components/Messages/MessageList.vue";
import MessageForm from "@/components/Messages/MessageForm.vue";

const authStore = useAuthStore();

</script>
<template>
    <nord-card padding="m">
        <template v-for="(conversation, index) in authStore.authenticatedUser.conversations"
                  :key="index">
            <h2 slot="header" class="n-margin-be-s">
                Echange avec le service planning
            </h2>
            <MessageList :conversation="conversation"/>
            <div slot="footer">
                <MessageForm :conversation="conversation"/>
            </div>
        </template>
    </nord-card>
</template>

<style scoped>
.flex {
    display: flex;
    justify-content: center;
}
</style>