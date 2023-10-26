<script setup>
import TheRadioInput from "@/components/Form/RadioInput.vue";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  isLate: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: null
  },
  isAlreadyValidated: {
    type: Boolean,
    default: null
  },
  numberOfDays: {
    type: Number,
    default: 7
  }
})
const emit = defineEmits(['changeValue'])

const isValidatedTeacher = ref(null);
const comment = ref(null);

onMounted(() => {
  isValidatedTeacher.value = props.isApproved ? 'true' : props.isApproved === false ? 'false' : 'null';
})

watch(() => isValidatedTeacher.value, () => {
  emit('changeValue', {isValidatedTeacher : isValidatedTeacher.value, comment : comment.value});
})

watch(() => comment.value, () => {
    emit('changeValue', {isValidatedTeacher : isValidatedTeacher.value, comment : comment.value});
})

</script>

<template>
  <div v-if="!isLate">
    <fieldset v-if="!isAlreadyValidated">
      <legend class="n-margin-be-s n-font-weight-strong">Votre réponse</legend>
      <nord-stack direction="vertical">
        <TheRadioInput v-model="isValidatedTeacher"
                       :item="{label: '<nord-icon class=\'n-color-text-weaker n-margin-ie-xs\' name=\'interface-time\'></nord-icon> En attente de validation', value: 'null'}"/>
        <TheRadioInput v-model="isValidatedTeacher"
                       :item="{label: '<nord-icon class=\'n-color-text-success n-margin-ie-xs\' name=\'interface-checked-small\'></nord-icon> Validée', value: 'true'}"/>
        <TheRadioInput v-model="isValidatedTeacher"
                       :item="{label: '<nord-icon class=\'n-color-text-error n-margin-ie-xs\' name=\'interface-close-small\'></nord-icon> Refusée', value: 'false'}"/>
      </nord-stack>
        <div class="n-margin-bs-l">
                <nord-textarea v-model="comment" label="Votre commentaire :" placeholder="Ecrivez un commentaire à transmettre au service (optionnel)" resize="auto" expand></nord-textarea>
        </div>
    </fieldset>
    <div v-else>
      <p>Le créneau a déjà été validé par le service planning.</p>
      <p class="n-margin-bs-m">Vous pouvez contacter le service planning en cliquant <span
          class="n-font-size-l n-font-weight-strong"><RouterLink to="messagerie">ici</RouterLink></span></p>
    </div>
  </div>
  <div v-else>
    <p>Désolée, il est trop tard pour modifier votre réponse.</p>
    <p class="n-margin-bs-m">Vous pouvez contacter le service planning en cliquant <span
        class="n-font-size-l n-font-weight-strong"><RouterLink to="messagerie">ici</RouterLink></span></p>
  </div>
</template>

<style scoped>
fieldset {
  border: none;
}
</style>