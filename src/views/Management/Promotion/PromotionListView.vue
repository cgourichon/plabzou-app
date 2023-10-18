<script setup>
import {onMounted, ref} from "vue";
import {usePromotionStore} from "@/stores/promotion.store";
import {getFrenchDate} from "@/utils/dayjs"
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
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des promotions</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/promotions/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une promotion
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th>Cursus suivi</th>
          <th>Période de formation</th>
          <th>Apprenants</th>
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
              {{ promotion.learners.length }}
            </nord-stack>
          </td>
          <td>
            {{ promotion?.city?.name ?? '-'}}
          </td>
          <td class="n-table-align-right">
            <nord-stack direction="horizontal" justify-content="end">
              <nord-button @click="selectPromotion(promotion)" size="s" variant="primary">
                <nord-icon slot="start" name="user-multiple"/>
                Effectif
              </nord-button>

              <RouterLink :to="`/gestion/promotions/${promotion.id}/modifier`">
                <nord-button size="s" variant="primary">
                  <nord-icon slot="start" name="interface-edit"/>
                  Modifier
                </nord-button>
              </RouterLink>
            </nord-stack>
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
