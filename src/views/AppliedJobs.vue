<template>
  <div>
    <h1 v-if="$store.getters.appliedJobs.length === 0" class="text-center">
      No jobs applied, find the job you want and apply
    </h1>
    <JobResult class="animate__animated animate__bounceInLeft"></JobResult>
    <JobModal></JobModal>
  </div>
</template>
<script>
  import JobModal from '../components/Jobs/JobModal.vue';
  import JobResult from '../components/Jobs/JobResult.vue';
  export default {
    components: { JobResult, JobModal },
  };
</script>
