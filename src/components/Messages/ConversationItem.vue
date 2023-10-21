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
  return conversation.messages[conversation.messages.length - 1];
}
</script>

<template>
  <div
      :class="props.actualConversation?.id === props.conversation.id
      ? 'n-color-status-info-weak n-padding-s n-margin-be-s item-list'
      : 'n-margin-be-s n-padding-s item-list'"
  >
    <div>{{ props.conversation.teacher.full_name }}</div>
    <nord-stack align-items="center" direction="horizontal" justify-content="space-between">
      <div class="n-font-size-s n-color-text-weaker">{{ latestMessage(props.conversation)?.message }}</div>
      <div class="n-font-size-xs n-color-text-weaker">
        {{ dayjs(latestMessage(props.conversation)?.created_at).format('DD/MM') }}
      </div>
    </nord-stack>
  </div>
  <nord-divider></nord-divider>
</template>

<style scoped>
.item-list:hover {
  background: var(--n-color-status-info);
  color: white;
  cursor: pointer;
}

.item-list:hover .n-color-text-weaker {
  color: white;
}
</style>