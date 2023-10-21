<script setup>
import {computed} from "vue";
const props = defineProps({
    modelValue: {
        default: null,
    },
    item: {
        type: Object,
        default: null
    },
})

const isChecked = computed(() => {
    return props.modelValue === props.item.value;
});

defineEmits(['update:modelValue'])

</script>

<template>
    <nord-stack direction="horizontal">
        <div class="n-input-container">
            <input type="radio"
                   :disabled="item.disabled"
                   class="n-input"
                   slot="input"
                   :value="item.value"
                   :checked="isChecked"
                   @change="$emit('update:modelValue', $event.target.value)"
            />
        </div>
        <label v-html="item.label"></label>
    </nord-stack>
</template>

<style scoped>
.n-input-container {
    position: relative;
}

input {
    -webkit-appearance: radio;
    border: none;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: #F6F8F8 !important;
}
</style>