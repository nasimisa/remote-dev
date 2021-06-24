<template>
  <v-row dense>
    <v-col v-for="(job, i) in jobs" :key="i" cols="12">
      <v-card elevation="6" class="mb-2" shaped>
        <div class="d-flex flex-sm-row flex-column justify-space-between">
          <div class="d-flex align-center">
            <v-avatar class="ma-3 mr-0" size="50">
              <v-img :src="job.imgURL" :alt="job.companyName + ' logo'"></v-img>
            </v-avatar>
            <div>
              <v-card-title
                tabindex="0"
                class="text-decoration-underline"
                style="cursor:pointer;"
                @click="openJobModal(job)"
                >{{ job.jobTitle }}</v-card-title
              >

              <v-card-subtitle
                >{{ job.companyName }}
                {{ job.requiredLocation ? '(' + job.requiredLocation + ')' : '' }}</v-card-subtitle
              >
            </div>
          </div>

          <v-card-actions>
            <v-btn
              @click="controlSavedJobs(job)"
              v-if="$router.currentRoute.path !== '/applied-jobs'"
            >
              <v-icon size="30">
                {{ job.bookmarked === true ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon
              >
            </v-btn>

            <v-card-subtitle>{{ formatDate(new Date(job.publicationDate)) }}</v-card-subtitle>
            <v-btn
              v-if="$router.currentRoute.path === '/applied-jobs'"
              @click="removeAppliedJob(job)"
            >
              <v-icon size="30">mdi-trash-can</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    computed: {
      jobs() {
        if (this.$router.currentRoute.path === '/saved-jobs') {
          return this.$store.getters.savedJobs;
        }

        if (this.$router.currentRoute.path === '/applied-jobs') {
          return this.$store.getters.appliedJobs;
        }

        if (this.$store.state.hideUSonly) {
          return this.$store.getters.filteredJobs.slice(0, this.$store.state.jobsShown);
        }
        return this.$store.getters.jobs.slice(0, this.$store.state.jobsShown);
      },
    },
    methods: {
      formatDate(date) {
        const calcDaysPassed = (date1, date2) =>
          Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

        const daysPassed = calcDaysPassed(new Date(), date);

        if (daysPassed === 0) return 'Today';
        if (daysPassed === 1) return 'Yesterday';
        if (daysPassed <= 6) return `${daysPassed} days ago`;
        if (daysPassed === 7) return '1 week ago';

        return new Intl.DateTimeFormat('en-UK').format(date);
      },
      openJobModal(clickedJob) {
        this.$store.state.dialog = true;

        this.$store.dispatch('openJobModal', clickedJob);
      },
      saveJob(savedJob) {
        const job = savedJob;
        job.bookmarked = true;

        this.$store.dispatch('saveJob', job);
      },
      removeSavedJob(savedJob) {
        const job = savedJob;

        job.bookmarked = false;

        this.$store.dispatch('removeSavedJob', job);
      },
      controlSavedJobs(savedJob) {
        if (!savedJob.bookmarked) {
          this.saveJob(savedJob);
        } else {
          this.removeSavedJob(savedJob);
        }
      },
      removeAppliedJob(appliedJob) {
        const job = appliedJob;

        job.applied = false;

        this.$store.dispatch('removeAppliedJob', job);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border: 2px solid $primary;
  }
</style>
