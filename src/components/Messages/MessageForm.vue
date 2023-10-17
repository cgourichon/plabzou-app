<script setup>
import {useConversationStore} from "@/stores/conversation.store";
import {useApplicationStore} from "@/stores/application.store";
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth.store";

const conversationStore = useConversationStore();
const applicationStore = useApplicationStore();
const authStore = useAuthStore();

const props = defineProps({
    conversationId: {
        type: Number,
        default: null
    }
})

const form = ref({
    message: null,
    sender_id: authStore.authenticatedUser.id,
    conversation_id: props.conversationId
})

const submitButton = ref(null);

const sendMessage = () => {
    submitButton.value.loading = true;
    applicationStore.clearErrors();
    conversationStore.sendMessage(form.value)
        .then(() => form.value.message = null)
        .finally(() => submitButton.value.loading = false);
}
</script>

<template>
    <form id="send-message" @submit.prevent="sendMessage" class="n-margin-bs-l flex">
        <nord-textarea v-model="form.message"
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
        <nord-button ref="submitButton" type="submit" variant="primary" class="n-margin-bs-s n-margin-is-s">
            <nord-icon size="m" name="interface-send"></nord-icon>
        </nord-button>
    </form>
</template>

<style scoped>

</style>