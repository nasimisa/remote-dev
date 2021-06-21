<template>
  <div>
    <v-app-bar color="#edb92a" dark height="auto" class="mt-2 rounded-t">
      <v-toolbar-title class="ml-n3 mr-md-16">
        <router-link to="/" style="cursor:pointer">
          <v-img
            alt="Logo"
            class="shrink mr-2 rounded-circle"
            contain
            src="../../assets/logo.png"
            width="100"
          />
        </router-link>
      </v-toolbar-title>

      <v-spacer class="hidden-lg-and-up"></v-spacer>

      <router-link v-for="(item, i) in menuItems" :key="i" :to="item.routeLink" tag="span">
        <v-btn elevation="0" class="hidden-xs-only mr-1">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </router-link>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="sideNav = !sideNav"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer absolute temporary v-model="sideNav" right>
      <v-list dense>
        <v-list-item v-for="(item, i) in menuItems" :key="i" :to="item.routeLink">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'TheNavigation',
    data: () => ({
      sideNav: false,
      menuItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          routeLink: '/',
        },
        {
          icon: 'mdi-bookmark-check',
          title: 'Saved Jobs',
          routeLink: '/saved-jobs',
        },
        {
          icon: 'mdi-briefcase-check',
          title: 'Applied Jobs',
          routeLink: '/applied-jobs',
        },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
  .v-list-item--active {
    background: $text;
    color: #fff !important;
  }
</style>
