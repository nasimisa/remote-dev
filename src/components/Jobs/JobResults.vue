<template>
  <div>
    <v-banner single-line elevation="6" color="#edb92a" rounded class="mb-6" dark>
      <v-row>
        <v-col class="col-sm-7 col-md-8">
          <v-icon slot="icon" color="#262a31" size="30" class="mr-2">
            mdi-information
          </v-icon>
          <span>{{ numberOfJobs }} Matching Jobs</span>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-banner>

    <JobResult />

    <h1 v-if="numberOfJobs === 0" class="text-center">
      No Jobs found, please try with another keyword or Reload the page
    </h1>

    <div class="text-center">
      <v-btn
        v-if="numberOfJobs > 10 && this.$store.state.jobsShown < numberOfJobs"
        @click="loadMoreJobs"
        >More Jobs</v-btn
      >
    </div>
  </div>
</template>

<script>
  import JobResult from './JobResult.vue';

  export default {
    components: { JobResult },
    computed: {
      numberOfJobs() {
        if (this.$store.state.hideUSonly) {
          return this.$store.getters.filteredJobs.length;
        }
        return this.$store.getters.jobs.length;
      },
    },
    methods: {
      loadMoreJobs() {
        this.$store.state.jobsShown += 10;
      },
    },
  };
</script>
