<script setup>
import {useCategoryStore} from "@/stores/category.store";
import {onMounted} from "vue";

const categoryStore = useCategoryStore()
categoryStore.resetCategories()

onMounted(async () => {
  await categoryStore.fetchCategories()
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Liste des catégories</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/categories/ajouter">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="interface-add"/>
          Ajouter une catégorie
        </nord-button>
      </RouterLink>
    </div>

    <nord-table striped>
      <table>
        <thead>
        <tr>
          <th class="n-table-align-right">Id</th>
          <th>Nom</th>
          <th class="n-table-align-right">Modifier</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categoryStore.categories" :key="category.id">
          <td class="n-table-align-right">
            {{ category.id }}
          </td>
          <td>
            {{ category.name }}
          </td>
          <td class="n-table-align-right">
            <RouterLink :to="`/gestion/categories/${category.id}/modifier`">
              <nord-button size="s" variant="primary">
                <nord-icon slot="start" name="interface-edit"/>
                Modifier
              </nord-button>
            </RouterLink>
          </td>
        </tr>
        </tbody>
      </table>
    </nord-table>
  </nord-card>
</template>

<style scoped>

</style>
