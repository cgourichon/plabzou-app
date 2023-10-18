<script setup>
import dayjs from "dayjs";

const props = defineProps({
    conversation: {
        type: Object,
        default: null
    },
    actualConversation: {
        type: Object,
        default: null
    },
})

const latestMessage = conversation => {
    return conversation.messages[conversation.messages.length -1];
}

</script>

<template>
    <div :class="props.actualConversation?.id === props.conversation.id ? 'n-color-status-info-weak n-padding-s n-margin-be-s  item-list' : 'n-margin-be-s n-padding-s item-list'">
        <div>{{props.conversation.teacher.full_name}}</div>
        <nord-stack direction="horizontal" justify-content="space-between" align-items="center">
            <div class="n-font-size-s n-color-text-weaker">{{latestMessage(props.conversation)?.message}}</div>
            <div class="n-font-size-xs n-color-text-weaker">{{dayjs(latestMessage(props.conversation)?.created_at).format('DD/MM')}}</div>
        </nord-stack>
    </div>
    <nord-divider></nord-divider>
</template>

<style scoped>
.item-list:hover {
    background: #3559c7;
    color: white;
    cursor: pointer;
}
</style>