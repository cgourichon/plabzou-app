<script setup>
import {useAuthStore} from "@/stores/auth.store";
import RequestItem from "@/components/Request/RequestItem.vue";

const authStore = useAuthStore();
</script>

<template>
    <div class="container">
        <template v-for="request in authStore.authenticatedUser.teacher.requests" :key="request.id">
            <div class="card">
                <RequestItem :request="request"/>
            </div>
        </template>
    </div>
</template>

<style scoped>

@media (min-width: 1400px) {
    .container {
        grid-template-columns: repeat(3, 1fr);
        max-width: none;
    }
}

@media (min-width: 696px) and (max-width: 1400px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
        max-width: none;
    }
}

.container {
    display: grid;
    grid-gap: 24px;
}

.card {
  height: 100%;
}
</style>