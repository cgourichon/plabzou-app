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

const showDrawer = ref(false)
const selectedPromotion = ref(null)

const openDrawer = (promotion) => {
  selectedPromotion.value = promotion
  showDrawer.value = true
}

const closeDraw = () => {
  selectedPromotion.value = null
  showDrawer.value = false
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
            <nord-stack align-items="center" direction="horizontal" gap="s" justify-content="space-around">
              {{ promotion.learners.length }}
            </nord-stack>
          </td>
          <td>
            {{ promotion?.city?.name ?? '-' }}
          </td>
          <td class="n-table-align-right">
            <nord-stack direction="horizontal" justify-content="end">
              <nord-button size="s" variant="primary" @click="openDrawer(promotion)">
                <nord-icon slot="start" name="user-multiple"/>
                Voir l'effectif
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

  <PromotionLeanersDrawer v-if="showDrawer" :promotion="selectedPromotion" @click="closeDraw"/>
</template>

<style scoped>

</style>
