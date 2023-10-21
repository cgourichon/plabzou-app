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
  sender_id: authStore.authenticatedUser?.id,
  conversation_id: null
})

const submitButton = ref(null);
//Besoin d'une var non reactive
let message = '';

//Création de la conversation côté teacher si il n'y avait encore aucun message échangé
const createConversation = async () => {
  await conversationStore.createConversation({teacher_id: authStore.authenticatedUser?.id})
}

const sendMessage = async () => {

  if (!form.value.conversation_id) {
    message = form.value.message;
    await createConversation()
        .then(() => {
          form.value.message = message;
          form.value.conversation_id = authStore.authenticatedUser?.conversations[0].id;
        })
  }


  submitButton.value.loading = true;
  applicationStore.clearErrors();
  await conversationStore.sendMessage(form.value)
      .then(() => {
        form.value.message = null
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
        class="n-margin-bs-l"
        @submit.prevent="sendMessage">
    <div id="send-area">
      <nord-textarea
          v-model="form.message"
          :error="applicationStore.errors?.message"
          character-counter
          expand
          hideLabel
          label="Message"
          maxlength="255"
          placeholder="Ecrivez votre message ici"
          resize="auto"
          style="--n-textarea-block-size: 50px"
          @keydown.enter="sendMessage"
          name="textarea-message"
      >
      </nord-textarea>
      <nord-button
          id="send-button"
          ref="submitButton"
          class="n-margin-bs-s n-margin-is-s"
          type="submit"
          variant="primary">
        <nord-icon name="interface-send" size="m"></nord-icon>
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