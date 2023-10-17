<script setup>
import MessageItem from "@/components/Messages/MessageItem.vue";
import {onMounted, onUpdated, ref} from "vue";

const props = defineProps({
    conversation: {
        type: Object,
        default: null
    }
})

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
    <div ref="divMessages" class="card-message-size n-padding-ie-s">
        <div v-for="message in props.conversation.messages"
             :key="message.id">
            <MessageItem :name="props.conversation.name" :message="message"/>
        </div>
    </div>
</template>

<style scoped>
.card-message-size {
    max-height: 48vh;
    height: 48vh;
    overflow-y: scroll;
}

</style>