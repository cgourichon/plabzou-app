<script setup>
import {ref} from "vue";
import {useTeacherStore} from "@/stores/teacher.store";
import {useConversationStore} from "@/stores/conversation.store";
import {useApplicationStore} from "@/stores/application.store";

const modalNewConversation = ref(null);
const openModal = () => {
  modalNewConversation.value.showModal();
}

const closeModal = () => {
  modalNewConversation.value.close();
  selectedTeacher.value = null;
  applicationStore.clearErrors();
}

const conversationStore = useConversationStore();
const applicationStore = useApplicationStore()

const teacherStore = useTeacherStore();

const selectedTeacher = ref(null);

const createConversation = () => {
  applicationStore.clearErrors();
  conversationStore.createConversation({teacher_id: selectedTeacher.value})
      .finally(() => {
        if (!applicationStore.hasErrors) closeModal()
      })
}

</script>

<template>
  <nord-button id="trigger-new-conversation" variant="primary" @click="openModal">
    <nord-icon name="interface-edit-2" size="s"></nord-icon>
  </nord-button>

  <nord-modal ref="modalNewConversation" aria-labelledby="title">
    <h2 id="title" slot="header">Nouvelle conversation</h2>

    <form id="form-new-conversation" method="dialog">
      <nord-stack>
        <nord-select
            v-model="selectedTeacher"
            :error="applicationStore.errors?.teacher_id"
            autocomplete="name"
            autofocus
            expand
            label="Avec quel formateur souhaitez-vous démarrer une nouvelle conversation ?"
            name="select-teacher-message"
            placeholder="Choisir un formateur dans la liste"
        >
          <option v-for="teacher in teacherStore.teachers"
                  :key="teacher.user_id"
                  :value="teacher.user_id">
            {{ teacher.full_name }}
          </option>
        </nord-select>
      </nord-stack>
    </form>

    <nord-button slot="footer" expand form="myForm" value="cancel" @click="closeModal">Annuler</nord-button>
    <nord-button slot="footer" expand form="myForm" type="submit" value="add" variant="primary"
                 @click="createConversation">Valider
    </nord-button>
  </nord-modal>

  <div class="n-margin-bs-m">
    <output id="output"></output>
    <pre id="values"></pre>
  </div>
</template>

<style scoped>

</style>