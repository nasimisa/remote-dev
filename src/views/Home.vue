<template>
  <div>
    <TheHero />
    <JobSearchBar />
    <JobResults />
    <br />
    <JobModal />
    <v-btn
      v-show="fab"
      class="rounded-circle"
      fab
      dark
      fixed
      bottom
      right
      v-scroll="onScroll"
      @click="scrollToTop"
    >
      <v-icon>mdi-airplane</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import JobModal from '../components/Jobs/JobModal.vue';
  import JobResults from '../components/Jobs/JobResults.vue';
  import JobSearchBar from '../components/Jobs/JobSearchBar.vue';
  import TheHero from '../components/Layout/TheHero.vue';

  export default {
    name: 'Home',

    data() {
      return {
        fab: false,
      };
    },

    components: {
      TheHero,
      JobSearchBar,
      JobResults,
      JobModal,
    },

    methods: {
      onScroll(e) {
        if (typeof window === 'undefined') return;
        const top = window.pageYOffset || e.target.scrollTop || 0;
        this.fab = top > 200;
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
    },
  };
</script>
