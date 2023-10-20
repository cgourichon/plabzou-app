<script setup>
import {getDatetimeShortFormatWithoutTime,} from "@/utils/dayjs";
import TheModal from "@/components/TheModal.vue";
import {ref} from "vue";
import RequestCardContent from "@/components/Request/RequestCardContent.vue";
import dayjs from "dayjs";
import RequestModalActionContent from "@/components/Request/RequestModalActionContent.vue";
import {useRequestStore} from "@/stores/request.store";
import {useAuthStore} from "@/stores/auth.store";
import RequestModalDetailsContent from "@/components/Request/RequestModalDetailsContent.vue";

const props = defineProps({
    request: {
        type: Object,
        default: null
    }
})

const cancelAction = ref(false);
const requestStore = useRequestStore();
const authStore = useAuthStore();

const toLate = () => {
    return cancelAction.value = dayjs(props.request.timeslot.starts_at).diff(dayjs(), 'day') < 7;
}

const teacherAnswer = ref(null);

const handleValue = value => {
    teacherAnswer.value = value;
};

toLate();

const getBooleanStatus = value => {
    return value === 'true' ? true : value === 'false' ? false : null;
}

const sendResponse = async () => {
    await requestStore.updateRequest(props.request.id, {is_approved_by_teacher: getBooleanStatus(teacherAnswer.value)});
    await authStore.fetchAuthenticatedUser();
}

</script>

<template>
    <nord-card padding="l">
        <h2 slot="header">Demande du {{getDatetimeShortFormatWithoutTime(request.created_at)}}</h2>
        <nord-stack direction="horizontal">
            <RequestCardContent :request="request"/>
        </nord-stack>
        <div slot="footer">
            <hr class="n-divider" />
            <p class="n-margin-bs-m" v-if="request.deleted_at">Demande annulée (le {{getDatetimeShortFormatWithoutTime(request.deleted_at)}})</p>
            <div v-else class="n-margin-bs-m">
                <nord-stack direction="horizontal">
                    <TheModal :id-modal="`answer-request-${request.id}`"
                              @action="sendResponse"
                              :disabled-action="cancelAction"
                    >

                        <template v-if="request.is_approved_by_teacher === null" #openButton>Répondre</template>
                        <template v-else #openButton>Modifier</template>

                        <template v-if="request.is_approved_by_teacher === null" #title>Répondre à la demande</template>
                        <template v-else #title>Modifier votre réponse</template>

                        <template #content>
                            <RequestModalActionContent @changeValue="handleValue"
                                                       :is-already-validated="props.request.timeslot.is_validated"
                                                       :is-approved="props.request.is_approved_by_teacher"
                                                       :is-late="cancelAction"/>
                        </template>

                        <template #cancelButton>Annuler</template>
                        <template #confirmButton>Envoyer la réponse</template>
                    </TheModal>
                    <TheModal color-button="secondary"
                              :id-modal="`details-${request.id}`"
                    >
                        <template #openButton>Voir le détail</template>
                        <template #title>Détails de la demande</template>

                        <template #content>
                            <RequestModalDetailsContent :request="request"/>
                        </template>

                        <template #cancelButton>Retour</template>
                        <template #confirmButton>Envoyer la réponse</template>
                    </TheModal>
                </nord-stack>
            </div>
        </div>
    </nord-card>
</template>

<style scoped>

</style>