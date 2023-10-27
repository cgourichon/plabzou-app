<script setup>
import {ref} from "vue";

defineProps({
  colorButton: {
    type: String,
    default: 'primary'
  },
  sizeModal: {
    type: String,
    default: 'm'
  },
  idModal: {
    type: String,
    default: null
  },
  disabledAction: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['action'])

const modalNewConversation = ref(null);

const openModal = () => {
  modalNewConversation.value.showModal();
}

const closeModal = () => {
  modalNewConversation.value.close();
}

const actionModal = () => {
  emit('action');
  closeModal();
}
</script>

<template>
  <nord-button :id="`openButton-${idModal}`" :variant="colorButton" @click="openModal">
    <slot name="openButton"></slot>
  </nord-button>

  <nord-modal :id="`modal-${idModal}`" ref="modalNewConversation" :size="sizeModal" aria-labelledby="title">
    <h2 :id="`title-${idModal}`" slot="header">
      <slot name="title"></slot>
    </h2>
    <p class="n-reset">
      <slot name="content"></slot>
    </p>
    <nord-button
        :id="`cancelButton-${idModal}`" slot="footer"
        expand
        @click="closeModal"
    >
      <slot name="cancelButton"></slot>
    </nord-button>
    <nord-button
        v-show="showButton"
        :id="`confirmButton-${idModal}`" slot="footer"
        :disabled="disabledAction"
        autofocus
        expand
        variant="primary"
        @click="actionModal"
    >
      <slot name="confirmButton"></slot>
    </nord-button>
  </nord-modal>
</template>

<style scoped>

</style>