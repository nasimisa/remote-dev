<template>
  <div>
    <JobResult></JobResult>
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
