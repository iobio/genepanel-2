<template>
  <div>
    <!-- <v-card> -->
    <!-- <v-card-text> -->
    <v-tabs v-model="tabs" fixed-tabs centered class="pa-2">
      <v-tab
        v-for="(item, idx) in titles"
        :key="idx"
        style="text-transform: none"
      >
        {{ item.data }}
      </v-tab>
    </v-tabs>
    <!-- </v-card-text> -->
    <!-- </v-card> -->
    <br />
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class=" ">
              <div class="row">
                <div class="col-md-7">
                  <img width="90%" src="./genepanel_artboard_1.png" alt="" />
                </div>
                <div class="col-md-5">
                  <v-card-title class="headline">
                    Enter a clinical note or select a condition
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Duis lobortis massa imperdiet quam. Donec vitae orci sed
                      dolor rutrum auctor. Vestibulum facilisis, purus nec
                      pulvinar iaculis, ligula mi congue nunc, vitae euismod
                      ligula urna in dolor. Praesent congue erat at massa.
                    </p>
                    <p class="mb-0">
                      Ut leo. Suspendisse potenti. Duis vel nibh at velit
                      scelerisque suscipit. Fusce pharetra convallis urna.
                    </p>
                  </v-card-text>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class=" ">
              <div class="row">
                <div class="col-md-7">
                  <img width="100%" src="./genepanel_artboard_2.png" alt="" />
                </div>
                <div class="col-md-5">
                  <v-card-title class="headline">
                    Enter a clinical note or select a condition
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Duis lobortis massa imperdiet quam. Donec vitae orci sed
                      dolor rutrum auctor. Vestibulum facilisis, purus nec
                      pulvinar iaculis, ligula mi congue nunc, vitae euismod
                      ligula urna in dolor. Praesent congue erat at massa.
                    </p>
                    <p class="mb-0">
                      Ut leo. Suspendisse potenti. Duis vel nibh at velit
                      scelerisque suscipit. Fusce pharetra convallis urna.
                    </p>
                  </v-card-text>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class=" ">
              <div class="row">
                <div class="col-md-7">
                  <img width="90%" src="./genepanel_artboard_3.png" alt="" />
                </div>
                <div class="col-md-5">
                  <v-card-title class="headline">
                    Enter a clinical note or select a condition
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Duis lobortis massa imperdiet quam. Donec vitae orci sed
                      dolor rutrum auctor. Vestibulum facilisis, purus nec
                      pulvinar iaculis, ligula mi congue nunc, vitae euismod
                      ligula urna in dolor. Praesent congue erat at massa.
                    </p>
                    <p class="mb-0">
                      Ut leo. Suspendisse potenti. Duis vel nibh at velit
                      scelerisque suscipit. Fusce pharetra convallis urna.
                    </p>
                  </v-card-text>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class=" ">
              <div class="row">
                <div class="col-md-7">
                  <img width="90%" src="./genepanel_artboard_4.png" alt="" />
                </div>
                <div class="col-md-5">
                  <v-card-title class="headline">
                    Enter a clinical note or select a condition
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Duis lobortis massa imperdiet quam. Donec vitae orci sed
                      dolor rutrum auctor. Vestibulum facilisis, purus nec
                      pulvinar iaculis, ligula mi congue nunc, vitae euismod
                      ligula urna in dolor. Praesent congue erat at massa.
                    </p>
                    <p class="mb-0">
                      Ut leo. Suspendisse potenti. Duis vel nibh at velit
                      scelerisque suscipit. Fusce pharetra convallis urna.
                    </p>
                  </v-card-text>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tabs: 0,
      titles: [
        {
          data: "Enter a clinical note or select a condition",
        },
        {
          data: "Review the terms and submit",
        },
        {
          data: "App compiles a comprehensive gene list",
        },
        {
          data: "View gene info or export findings",
        },
      ],
    };
  },
  mounted() {
    // setInterval(() => {
    //   this.scrollTabs();
    // }, 10000);
  },
  updated() {},
  watch: {},
  methods: {
    scrollTabs() {
      if (this.tabs === 2) {
        this.tabs = 0;
      } else {
        this.tabs = this.tabs + 1;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
</style>
