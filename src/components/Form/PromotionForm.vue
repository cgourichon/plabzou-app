<script setup>
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import {useApplicationStore} from "@/stores/application.store";
import {usePromotionStore} from "@/stores/promotion.store";
import {useCourseStore} from "@/stores/course.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useCityStore} from "@/stores/city.store";
import {getDateWithoutTimeZone} from "@/utils/dayjs";
import TheDestroyModal from "@/components/TheDestroyModal.vue";

const props = defineProps({
  promotion: {
    type: Object,
    default: null,
  }
})

const promotionStore = usePromotionStore()
const courseStore = useCourseStore()
const learnerStore = useLearnerStore()
const cityStore = useCityStore()
const applicationStore = useApplicationStore()

const selectedCourse = ref(null)
const selectedCity = ref(null)
const selectedLearners = ref(null)
const destroyModalOpened = ref(false)

const form = computed(() => {
  selectedCourse.value = props.promotion?.course ?? ''
  selectedCity.value = props.promotion?.city ?? ''
  selectedLearners.value = props.promotion?.learners ?? []

  return {
    name: props.promotion?.name ?? null,
    starts_at: props.promotion?.starts_at ? getDateWithoutTimeZone(props.promotion?.starts_at) : '',
    ends_at: props.promotion?.ends_at ? getDateWithoutTimeZone(props.promotion?.ends_at) : '',
    course: '',
    city: '',
    learners: props.promotion?.learners ?? [],
  }
})

const store = async () => {
  form.value.course = selectedCourse.value.id
  form.value.city = selectedCity.value.id
  form.value.learners = selectedLearners.value

  applicationStore.clearErrors()
  await promotionStore.createPromotion(form.value)
  await redirect()
}

const update = async () => {
  form.value.course = selectedCourse.value.id
  form.value.city = selectedCity.value.id
  form.value.learners = selectedLearners.value

  applicationStore.clearErrors()
  await promotionStore.updatePromotion(props.promotion.id, form.value)
  await redirect()
}

const destroy = async () => {
  applicationStore.clearErrors()
  await promotionStore.deletePromotion(props.promotion.id)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'promotions-list'})
}

const openCloseDestroyModal = () => {
  destroyModalOpened.value = !destroyModalOpened.value
}

onMounted(async () => {
  await courseStore.fetchCourses()
  await cityStore.fetchCities()
  await learnerStore.fetchLearners()
})

const nameWithPostcode = ({name, postcode}) => `${postcode} - ${name}`
</script>

<template>
  <form @submit.prevent="!!promotion ? update() : store()">
    <nord-stack>
      <nord-input
          v-model="form.name"
          :error="applicationStore.errors?.name"
          expand
          label="Nom"
          placeholder="Entrez un nom"
          type="text"
      />

      <nord-stack align-items="start" direction="horizontal" gap="xl">
        <nord-input
            v-model="form.starts_at"
            :error="applicationStore.errors?.starts_at"
            expand
            label="Date de début"
            type="date"
        />
        <nord-input
            v-model="form.ends_at"
            :error="applicationStore.errors?.ends_at"
            expand
            label="Date de fin"
            type="date"
        />
      </nord-stack>

      <div class="n-stack n-gap-s">
        <label class="n-label">Cursus</label>
        <multi-select
            v-model="selectedCourse"
            :options="courseStore.courses"
            :show-no-results="true"
            label="name"
            placeholder="Choisir un cursus"
            track-by="id"
        >
          <template #noResult>Pas de cursus correspondants</template>
          <template #noOptions>Aucun cursus trouvés</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.course"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.course }}
        </div>
      </div>

      <div class="n-stack n-gap-s">
        <label class="n-label">Ville</label>
        <multi-select
            v-model="selectedCity"
            :options="cityStore.cities"
            :show-no-results="true"
            :custom-label="nameWithPostcode"
            placeholder="Choisir une ville"
            track-by="id"
        >
          <template #noResult>Pas de villes correspondants</template>
          <template #noOptions>Aucun villes trouvées</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.city"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.city }}
        </div>
      </div>

      <div class="n-stack n-gap-s">
        <label class="n-label">Apprenants affiliés</label>
        <multi-select
            v-model="selectedLearners"
            :allow-empty="true"
            :clear-on-select="true"
            :close-on-select="false"
            :hide-selected="true"
            :multiple="true"
            :options="learnerStore.learners"
            :select-label="null"
            :show-no-results="true"
            label="full_name"
            track-by="user_id"
        >
          <template #noResult>Aucun apprenant correspondant</template>
          <template #noOptions>Pas d'apprenants...</template>
        </multi-select>
        <div
            v-if="applicationStore.errors?.learners"
            class="n-error"
            role="alert"
        >
          {{ applicationStore.errors?.learners[0] }}
        </div>
      </div>

      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!promotion ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!promotion" expand type="button" variant="dashed" @click="openCloseDestroyModal">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>

  <TheDestroyModal :open="destroyModalOpened" @close="openCloseDestroyModal" @destroy="destroy"/>
</template>
