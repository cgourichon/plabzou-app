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

const teacherStore = useTeacherStore();
const conversationStore = useConversationStore();
const applicationStore = useApplicationStore()

const getTeachers = () => {
    if (teacherStore.teachers.length === 0) teacherStore.fetchTeachers();
}

const selectedTeacher = ref(null);

const createConversation = () => {
    applicationStore.clearErrors();
    conversationStore.createConversation({teacher_id: selectedTeacher.value})
        .finally(() => {if (!applicationStore.hasErrors) closeModal()})
}

getTeachers();
</script>

<template>
    <nord-button id="trigger-new-conversation" @click="openModal" variant="primary">
        <nord-icon size="s" name="interface-edit-2"></nord-icon>
    </nord-button>

    <nord-modal ref="modalNewConversation" aria-labelledby="title">
        <h2 slot="header" id="title">Nouvelle conversation</h2>

        <form method="dialog" id="form-new-conversation">
            <nord-stack>
                <nord-select
                        autofocus
                        expand
                        autocomplete="name"
                        name="select-teacher-message"
                        label="Avec quel formateur souhaitez-vous démarrer une nouvelle conversation ?"
                        placeholder="Choisir un formateur dans la liste"
                        v-model="selectedTeacher"
                        :error="applicationStore.errors?.teacher_id"
                >
                  <option v-for="teacher in teacherStore.teachers"
                          :value="teacher.user_id"
                          :key="teacher.user_id">
                      {{teacher.full_name}}
                  </option>
                </nord-select>
            </nord-stack>
        </form>

        <nord-button slot="footer" expand form="myForm" @click="closeModal" value="cancel">Annuler</nord-button>
        <nord-button slot="footer" expand form="myForm" type="submit" @click="createConversation" value="add" variant="primary">Valider</nord-button>
    </nord-modal>

    <div class="n-margin-bs-m">
        <output id="output"></output>
        <pre id="values"></pre>
    </div>
</template>

<style scoped>

</style>