<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useCourseStore} from "@/stores/course.store";
import CourseForm from "@/components/Form/CourseForm.vue";

const courseStore = useCourseStore()
courseStore.resetCourse()

onMounted(async () => {
  await courseStore.fetchCourse(useRoute().params.id)
})
</script>

<template>
  <nord-card>
    <h2 slot="header">Modifier un cursus</h2>

    <div slot="header-end">
      <RouterLink to="/gestion/cursus">
        <nord-button size="s" variant="primary">
          <nord-icon slot="start" name="text-list"/>
          Liste des cursus
        </nord-button>
      </RouterLink>
    </div>

    <CourseForm :course="courseStore.course"/>
  </nord-card>
</template>

<style scoped>

</style>
