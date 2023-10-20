<script setup>
//TODO modifier la réponse
//TODO trop tard pour répondre, rediriger vers la messagerie

import TheRadioInput from "@/components/TheRadioInput.vue";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
    isLate : {
        type: Boolean,
        default: false
    },
    isApproved : {
        type: Boolean,
        default: null
    }
})
const emit = defineEmits(['changeValue'])

const isValidatedTeacher = ref(null);

onMounted(() => {
    isValidatedTeacher.value = props.isApproved ? 'true' : props.isApproved === false ? 'false' : 'null';
})

watch(() => isValidatedTeacher.value, () => {
    emit('changeValue', isValidatedTeacher.value);
})

</script>

<template>
    <div v-if="!isLate">
        <fieldset>
            <legend class="n-margin-be-s n-font-weight-strong">Votre réponse</legend>
            <nord-stack direction="vertical">
                <TheRadioInput v-model="isValidatedTeacher" :item="{label: '<nord-icon class=\'n-color-text-weaker n-margin-ie-xs\' name=\'interface-time\'></nord-icon> En attente de validation', value: 'null'}"/>
                <TheRadioInput v-model="isValidatedTeacher" :item="{label: '<nord-icon class=\'n-color-text-success n-margin-ie-xs\' name=\'interface-checked-small\'></nord-icon> Validée', value: 'true'}"/>
                <TheRadioInput v-model="isValidatedTeacher" :item="{label: '<nord-icon class=\'n-color-text-error n-margin-ie-xs\' name=\'interface-close-small\'></nord-icon> Refusée', value: 'false'}"/>
            </nord-stack>
        </fieldset>
    </div>
    <div v-else>
        <p>Le créneau est dans XX {{}} jours, il est trop tard pour modifier votre réponse.</p>
        <p class="n-margin-bs-m">Vous pouvez contacter le service planning en cliquant <span class="n-font-size-l n-font-weight-strong"><RouterLink to="messagerie">ici</RouterLink></span></p>
    </div>
</template>

<style scoped>
fieldset {
    border: none;
}
</style>