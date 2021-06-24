<template>
  <v-app>
    <TheNavigation />
    <v-main>
      <v-container>
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
  import TheNavigation from './components/Layout/TheNavigation.vue';
  import TheFooter from './components/Layout/TheFooter.vue';

  export default {
    components: {
      TheNavigation,
      TheFooter,
    },
    name: 'App',
  };
</script>

<style lang="scss">
  // style tag should not be empty in order .scss to work and no need to add any style link in index.html
</style>
