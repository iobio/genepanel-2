<template>
  <v-app style="background-color: white">
    <v-content>
      <!-- <Main/> -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>
