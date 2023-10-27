<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close', 'destroy'])

const closeModal = () => {
  emits('close')
}

const destroy = () => {
  emits('destroy')
  closeModal()
}
</script>

<template>
  <template v-if="open">
    <nord-modal :open="open" size="s" @close="closeModal">
      <h2 slot="header">Confirmation de suppression</h2>
      <p class="n-reset">
        Êtes-vous sûr de vouloir supprimer cet élément ?
      </p>
      <nord-button slot="footer" expand @click="closeModal">Annuler</nord-button>
      <nord-button slot="footer" expand variant="danger" @click="destroy">Supprimer</nord-button>
    </nord-modal>
  </template>
</template>
