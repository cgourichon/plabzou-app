<script setup>
import {onMounted} from "vue";
import {usePromotionStore} from "@/stores/promotion.store";
import {getFrenchDate} from "@/utils/date"

const promotionStore = usePromotionStore()
promotionStore.resetPromotions()

onMounted(async () => {
  await promotionStore.fetchPromotions()
})

const learnersLabel = (learnersNumber) => learnersNumber > 1 ? 'apprenants' : 'apprenant'
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des promotions</h2>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th>Cursus suivi</th>
          <th>Période de formation</th>
          <th>Campus de rattachement</th>
          <th class="n-table-align-right">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="promotion in promotionStore.promotions" :key="promotion.id">
          <td class="n-table-align-right">
            {{ promotion.id }}
          </td>
          <td>
            {{ promotion.name }}
          </td>
          <td>
            {{ promotion.course.name }}
          </td>
          <td>
            {{ getFrenchDate(promotion.starts_at) }} - {{ getFrenchDate(promotion.ends_at) }}
          </td>
          <td>
            {{ promotion?.city.name }}
          </td>
          <td class="n-table-align-right">
          </td>
        </tr>
        </tbody>
      </table>
    </nord-table>
  </nord-card>
</template>

<style scoped>

</style>
