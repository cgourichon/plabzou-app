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
        default: null
    }
})

const form = ref({
    message: null,
    sender_id: authStore.authenticatedUser.id,
    conversation_id: null
})

const submitButton = ref(null);
//Besoin d'une var non reactive
let message = '';

//Création de la conversation côté teacher si il n'y avait encore aucun message échangé
const createConversation = async () => {
    await conversationStore.createConversation({teacher_id: authStore.authenticatedUser.id})
}

const sendMessage = async () => {

    if (!form.value.conversation_id) {
        message = form.value.message;
        await createConversation()
            .then(() => {
                form.value.message = message;
                form.value.conversation_id = authStore.authenticatedUser.conversations[0].id;
            })
    }



    submitButton.value.loading = true;
    applicationStore.clearErrors();
    await conversationStore.sendMessage(form.value)
        .then(() => {
            form.value.message = null
            console.log('here 2');
        })
        .finally(() => submitButton.value.loading = false);


}

onBeforeUpdate(() => {
    if (props.conversation && form.value.conversation_id !== props.conversation.id) {
        form.value.conversation_id = props.conversation.id;
        form.value.message = null;
    }
})
</script>

<template>
    <form id="send-message"
          @submit.prevent="sendMessage"
          class="n-margin-bs-l">
        <div id="send-area">
            <nord-textarea v-model="form.message"
                           expand
                           @keydown.enter="sendMessage"
                           :error="applicationStore.errors?.message"
                           maxlength="255"
                           label="Message"
                           hideLabel
                           character-counter
                           name="test-b"
                           style="--n-textarea-block-size: 50px"
                           resize="auto"
                           placeholder="Ecrivez votre message ici">
            </nord-textarea>
            <nord-button
                ref="submitButton"
                type="submit"
                variant="primary"
                id="send-button"
                class="n-margin-bs-s n-margin-is-s">
                <nord-icon size="m" name="interface-send"></nord-icon>
            </nord-button>
        </div>
    </form>
</template>

<style scoped>
#send-button {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 10px;
}

#send-area {
    position: relative;
}

</style>