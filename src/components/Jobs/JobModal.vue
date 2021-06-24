<template>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog"
      scrollable
      transition="dialog-bottom-transition"
      max-width="800px"
    >
      <v-card shaped>
        <div class="v-card__header d-flex justify-space-between">
          <div>
            <v-card-title class="font-weight-bold"
              ><v-avatar class="ma-3 mr-1" size="50">
                <v-img :src="clickedJob.imgURL"></v-img> </v-avatar
              >{{ clickedJob.jobTitle }}
            </v-card-title>
            <v-card-subtitle class="font-weight-bold ml-16">
              Salary: {{ clickedJob.salary ? clickedJob.salary : 'To be discussed' }}
            </v-card-subtitle>
          </div>
          <v-btn @click="$store.state.dialog = false">
            <v-icon large>
              mdi-close-box-multiple
            </v-icon>
          </v-btn>
        </div>

        <v-divider></v-divider>
        <v-card-text v-html="clickedJob.jobDescription" class="mt-2 text-justify"></v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-center">
          <v-btn v-if="clickedJob.applied === false">
            <a :href="clickedJob.jobURL" target="_blank" @click="saveAppliedJob(clickedJob)"
              >Apply</a
            >
          </v-btn>
          <v-btn v-else-if="clickedJob.applied === true" disabled>
            Applied
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    computed: {
      clickedJob() {
        return this.$store.getters.clickedJob;
      },
    },
    methods: {
      saveAppliedJob(clickedJob) {
        clickedJob.applied = true;
        this.$store.state.dialog = false;

        this.$store.dispatch('saveAppliedJob', clickedJob);
      },
    },
  };
</script>

<style lang="scss">
  .v-card {
    .v-btn {
      background: $button !important;
      color: #fff !important;
      border-radius: 10px;
    }

    a {
      text-decoration: none !important;
      color: inherit !important;
    }

    &__header {
      background: $primary;

      .v-btn {
        background: transparent !important;
        color: $button !important;
        box-shadow: none;
        margin-top: 5px;
      }
    }

    &__text {
      color: $text !important;

      p,
      ul {
        font-size: 1.03rem;
        text-align: justify;
      }

      img {
        max-width: 350px !important;
      }
    }
  }
</style>
