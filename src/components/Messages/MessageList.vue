<script setup>
import MessageItem from "@/components/Messages/MessageItem.vue";
import {computed, onMounted, onUpdated, ref} from "vue";

const props = defineProps({
  conversation: {
    type: Object,
    default: null
  }
})

const conversation = computed(() => props.conversation);
const divMessages = ref(null)

const scrollDown = () => {
  setTimeout(() => {
    divMessages.value.scrollTop = divMessages.value.scrollHeight
  }, 100)
}

onMounted(() => {
  scrollDown();
})

onUpdated(() => {
  scrollDown();
})
</script>

<template>
  <div v-if="conversation?.messages"
       ref="divMessages"
       class="card-message-size n-padding-ie-s">
    <div v-for="message in conversation?.messages"
         :key="message.id">
      <MessageItem :message="message" :name="conversation.name"/>
    </div>
  </div>
  <div v-else>
    Pas de message à afficher pour le moment :-)
  </div>
</template>

<style scoped>
.card-message-size {
  max-height: 48vh;
  height: 48vh;
  overflow-y: scroll;
}

</style>