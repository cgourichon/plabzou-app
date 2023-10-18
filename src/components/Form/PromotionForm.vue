<script setup>
import router from "@/router";
import {computed, onMounted, ref} from "vue";
import {useApplicationStore} from "@/stores/application.store";
import {usePromotionStore} from "@/stores/promotion.store";
import {useCourseStore} from "@/stores/course.store";
import {useLearnerStore} from "@/stores/learner.store";
import {useCityStore} from "@/stores/city.store";
import {getDateWithoutTimeZone} from "@/utils/dayjs";

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

const form = computed(() => {
  selectedCourse.value = props.promotion?.course_id ?? ''
  selectedCity.value = props.promotion?.city_id ?? ''
  selectedLearners.value = props.promotion?.learners ?? []

  return {
    name: props.promotion?.name ?? null,
    starts_at: props.promotion?.starts_at ? getDateWithoutTimeZone(props.promotion?.starts_at) : '',
    ends_at: props.promotion?.ends_at ? getDateWithoutTimeZone(props.promotion?.ends_at) : '',
    course: props.promotion?.course_id ?? '',
    city: props.promotion?.city_id ?? '',
    learners: props.promotion?.learners ?? [],
  }
})

const store = async () => {
  form.value.course = selectedCourse.value
  form.value.city = selectedCity.value
  form.value.learners = selectedLearners.value

  applicationStore.clearErrors()
  await promotionStore.createPromotion(form.value)
  await redirect()
}

const update = async () => {
  form.value.course = selectedCourse.value
  form.value.city = selectedCity.value
  form.value.learners = selectedLearners.value

  applicationStore.clearErrors()
  await promotionStore.updatePromotion(props.promotion.id, form.value)
  await redirect()
}

const redirect = async () => {
  if (!applicationStore.hasErrors) await router.push({name: 'promotions-list'})
}

onMounted(async () => {
  await courseStore.fetchCourses()
  await cityStore.fetchCities()
  await learnerStore.fetchLearners()
})
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

      <nord-stack direction="horizontal" align-items="start" gap="xl">
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

      <nord-select
          v-model="selectedCourse"
          :error="applicationStore.errors?.course"
          expand
          label="Cursus suivi"
      >
        <option selected value="">Choisir un cursus</option>
        <option v-for="course in courseStore.courses" :value="course.id">{{ course.name }}</option>
      </nord-select>

      <nord-select
          v-model="selectedCity"
          :error="applicationStore.errors?.city"
          expand
          label="Ville de rattachement"
      >
        <option selected value="">Choisir une ville</option>
        <option v-for="city in cityStore.cities" :key="city.id" :value="city.id">{{ city.postcode }} - {{ city.name }}</option>
      </nord-select>

      <label class="n-label">Apprenants affiliés</label>
      <multi-select
          v-model="selectedLearners"
          :allow-empty="true"
          :clear-on-select="true"
          :close-on-select="false"
          :hide-selected="true"
          :multiple="true"
          :options="learnerStore.learners"
          :show-no-results="true"
          :select-label="null"
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


      <nord-stack direction="horizontal">
        <nord-button expand type="submit" variant="primary">
          {{ !!promotion ? 'Modifier' : 'Ajouter' }}
        </nord-button>

        <nord-button v-if="!!promotion" expand type="button" variant="danger" @click="destroy">
          Supprimer
        </nord-button>
      </nord-stack>
    </nord-stack>
  </form>
</template>
