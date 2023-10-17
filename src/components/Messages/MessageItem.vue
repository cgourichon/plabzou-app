<script setup>

import {useAuthStore} from "@/stores/auth.store";

const props = defineProps({
    message: {
        type: Object,
        default: null
    }
})

const authStore = useAuthStore();

</script>

<template>
    <div :class="props.message.sender.id ===  authStore.authenticatedUser.id ? 'n-align-end' : 'n-align-start'">
        <div id="name" class="n-font-weight-strong">
            <div v-if="props.message.sender.id ===  authStore.authenticatedUser.id">Moi</div>
            <div v-else>{{`${props.message.sender.first_name} ${props.message.sender.last_name}`}}</div>
        </div>
        <div id="message-content">{{props.message.message}}</div>
    </div>
</template>

<style scoped>

</style>