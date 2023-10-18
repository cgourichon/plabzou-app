<script setup>
import {onMounted, ref} from "vue";
import {usePromotionStore} from "@/stores/promotion.store";
import {getFrenchDate} from "@/utils/date"
import PromotionLeanersDrawer from "@/components/Drawer/PromotionLeanersDrawer.vue";

const promotionStore = usePromotionStore()
promotionStore.resetPromotions()

onMounted(async () => {
  await promotionStore.fetchPromotions()
})

const drawer = ref(null)
const selectedPromotion = ref({})
function selectPromotion(promotion) {
  selectedPromotion.value = promotion
  drawer.value.toggle()
}

const getLearnersLabel = (learners) => learners.length > 1 ? 'apprenants' : 'apprenant'
</script>

<template>
  <nord-card>
    {{ this.selectedPromotion }}

    <h2 slot="header">Liste des promotions</h2>
    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th>Cursus suivi</th>
          <th>Période de formation</th>
          <th>Effectif</th>
          <th>Ville de rattachement</th>
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
          <td class="n-table-align-left">
            <nord-stack direction="horizontal" justify-content="space-around" align-items="center" gap="s">
              {{ promotion.learners.length }} {{ getLearnersLabel(promotion.learners)}}
              <nord-button @click="selectPromotion(promotion)" size="s" variant="primary">
                <nord-icon slot="start" name="user-multiple"/>
              </nord-button>
            </nord-stack>
          </td>
          <td>
            {{ promotion?.city?.name ?? '-'}}
          </td>
          <td class="n-table-align-right">

          </td>
        </tr>
        </tbody>
      </table>
    </nord-table>
  </nord-card>
  <PromotionLeanersDrawer ref="drawer" :promotion="selectedPromotion"/>
</template>

<style scoped>

</style>
