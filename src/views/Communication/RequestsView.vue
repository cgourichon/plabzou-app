<script setup>
import {useAuthStore} from "@/stores/auth.store";
import RequestItem from "@/components/Request/RequestItem.vue";
import {computed, onBeforeUpdate, onMounted, ref} from "vue";

const authStore = useAuthStore();

const requests = ref(null);

onMounted(() => {
  requests.value = authStore.authenticatedUser?.teacher?.requests;
})

onBeforeUpdate(() => {
  requests.value = authStore.authenticatedUser?.teacher?.requests;
})

const searchField = ref(null);
const filterList = computed(() => {
    return searchField.value ? authStore.authenticatedUser?.teacher?.requests.filter(req => req.timeslot.name.toUpperCase().includes(searchField.value.toUpperCase()))
                             : authStore.authenticatedUser?.teacher?.requests;
})
</script>

<template>
    <div class="n-grid-3">
        <nord-input v-model="searchField" placeholder="Rechercher le nom ou la date du créneau" hideLabel expand></nord-input>
    </div>
  <div class="container">
    <template v-for="request in filterList" :key="request.id">
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