<script setup>
import {useAuthStore} from "@/stores/auth.store";
import {getTimeFromNow} from "@/utils/dayjs";
import dayjs from "dayjs";
import {computed} from "vue";

const props = defineProps({
  message: {
    type: Object,
    default: null
  }
})

const sentDate = computed(() => dayjs().diff(dayjs(props.message.created_at), 'day') > 7 ?
    dayjs(props.message.created_at).format('DD/MM HH:mm') :
    getTimeFromNow(props.message.created_at)
)

const authStore = useAuthStore();
</script>

<template>
  <div :class="props.message.sender.id ===  authStore.authenticatedUser?.id ? 'n-align-end' : 'n-align-start'">
    <div id="name" class="n-font-weight-heading n-color-text-weak" @click="sentDate(props.message.created_at)">
      <div v-if="props.message.sender.id ===  authStore.authenticatedUser?.id">
        Moi <span class="n-font-size-xs n-color-text-weaker">&nbsp; {{ sentDate }}</span>
      </div>
      <div v-else>{{ `${props.message.sender.first_name} ${props.message.sender.last_name}` }}
        <span class="n-font-size-xs n-color-text-weaker">&nbsp; {{ sentDate }}</span>
      </div>
    </div>
    <div id="message-content" class="n-margin-be-m">{{ props.message.message }}</div>
  </div>
</template>

<style scoped>

</style>