<script setup>
  import {ref} from "vue";

  const props = defineProps({
      colorButton : {
          type: String,
          default: 'primary'
      },
      sizeModal : {
          type: String,
          default: 'm'
      },
      idModal : {
          type: String,
          default : null
      },
      disabledAction: {
          type: Boolean,
          default: false
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
    <nord-button @click="openModal" :variant="colorButton" :id="`openButton-${idModal}`"><slot name="openButton"></slot></nord-button>

    <nord-modal ref="modalNewConversation" :id="`modal-${idModal}`" :size="sizeModal" aria-labelledby="title">
        <h2 slot="header" :id="`title-${idModal}`"><slot name="title"></slot></h2>
        <p class="n-reset"><slot name="content"></slot></p>
        <nord-button @click="closeModal" slot="footer"
                     expand
                     :id="`cancelButton-${idModal}`">
            <slot name="cancelButton"></slot>
        </nord-button>
        <nord-button @click="actionModal" slot="footer"
                     expand
                     :disabled="disabledAction"
                     :id="`confirmButton-${idModal}`"
                     variant="primary"
                     autofocus>
            <slot name="confirmButton"></slot>
        </nord-button>
    </nord-modal>

</template>

<style scoped>

</style>