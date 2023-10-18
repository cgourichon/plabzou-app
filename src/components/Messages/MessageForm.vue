<script setup>
import {useConversationStore} from "@/stores/conversation.store";
import {useApplicationStore} from "@/stores/application.store";
import {onBeforeUpdate, ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";

const conversationStore = useConversationStore();
const applicationStore = useApplicationStore();
const authStore = useAuthStore();

const props = defineProps({
    conversation: {
        type: Object,
        required: true
    }
})

const form = ref({
    message: null,
    sender_id: authStore.authenticatedUser.id,
    conversation_id: null
})

const submitButton = ref(null);

const sendMessage = () => {
    submitButton.value.loading = true;
    applicationStore.clearErrors();
    conversationStore.sendMessage(form.value)
        .then(() => form.value.message = null)
        .finally(() => submitButton.value.loading = false);
}

onBeforeUpdate(() => {
    if (form.value.conversation_id !== props.conversation.id) {
        form.value.conversation_id = props.conversation.id;
        form.value.message = null;
    }
})
</script>

<template>
    <form id="send-message"
          @submit.prevent="sendMessage"
          class="n-margin-bs-l">
        <nord-stack direction="horizontal" justify-content="center">
            <nord-textarea v-model="form.message"
                           id="textarea-message"
                           expand
                           @keydown.enter="sendMessage"
                           :error="applicationStore.errors?.message"
                           maxlength="255"
                           label="Message"
                           hideLabel
                           character-counter
                           style="--n-textarea-block-size: 50px"
                           resize="auto"
                           placeholder="Ecrivez votre message ici">
            </nord-textarea>
            <nord-button
                ref="submitButton"
                type="submit"
                variant="primary"
                class="n-margin-bs-s n-margin-is-s">
                <nord-icon size="m" name="interface-send"></nord-icon>
            </nord-button>
        </nord-stack>
    </form>
</template>

<style scoped>

</style>