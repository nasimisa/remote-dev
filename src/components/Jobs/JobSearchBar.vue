<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="12" class="col-md-8 mb-n10 mb-md-0">
      <form @submit.prevent="searchJobs">
        <v-text-field
          placeholder="Job Title, Keyword or Company"
          outlined
          solo
          shaped
          autofocus
          prepend-inner-icon="mdi-magnify"
          class="mt-5"
          color="#edb92a"
          v-model="$store.state.searchQuery"
        ></v-text-field>
      </form>
    </v-col>
    <v-col cols="12" class="col-md-3">
      <v-switch v-model="usOnly" color="#1b3e36" label="Hide US-only jobs" class="switch-label">
      </v-switch>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    computed: {
      usOnly: {
        get() {
          return this.$store.state.hideUSonly;
        },
        set(newValue) {
          this.$store.state.hideUSonly = newValue;
        },
      },
    },
    methods: {
      searchJobs() {
        this.$store.dispatch('searchJobs');
      },
    },
  };
</script>

<style lang="scss" scoped>
  // custom label color
  .switch-label {
    color: $button;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
