<script setup>
import PromotionForm from "@/components/Form/PromotionForm.vue";

import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {usePromotionStore} from "@/stores/promotion.store";

const promotionStore = usePromotionStore()
promotionStore.resetPromotion()

onMounted(async () => {
  await promotionStore.fetchPromotion(useRoute().params.id)
})

</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier une promotion</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/promotions">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des promotions
        </nord-button>
      </RouterLink>
    </div>

    <PromotionForm :promotion="promotionStore.promotion"/>
  </nord-card>
</template>

<style scoped>

</style>
