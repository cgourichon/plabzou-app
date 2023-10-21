<script setup>
import {ref} from "vue";
import axiosClient from "@/axios";

const props = defineProps({
  path: {
    type: String,
    required: true
  }
})

const file = ref(null);

const getFile = e => {
  file.value = e.target.files[0];
}
const sendFile = () => {
  let formData = new FormData();
  formData.append('import_file', file.value);
  axiosClient.post(props.path, formData, {headers: {"Content-Type": "multipart/form-data"}});
}
</script>

<template>
  <div class="n-stack n-gap-s">
    <label class="n-label">
      <slot>Import</slot>
    </label>
    <div class="n-stack n-stack-horizontal">
      <input class="n-input" type="file" @change="getFile($event)"/>
      <nord-button type="submit" @click="sendFile">Envoyer</nord-button>
    </div>
  </div>
</template>

<style scoped>

</style>