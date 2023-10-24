<script setup>
import RoomForm from "@/components/Form/RoomForm.vue";
import {useRoomStore} from "@/stores/room.store";
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const roomStore = useRoomStore()
roomStore.resetRoom()

onMounted(async () => {
  await roomStore.fetchRoom(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une salle</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/salles">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des salles
        </nord-button>
      </RouterLink>
    </div>

    <RoomForm :room="roomStore.room"/>
  </nord-card>
</template>

<style scoped>

</style>
