<template>
  <div>
    <v-tabs v-model="tabs" fixed-tabs centered class="pa-2">
      <v-tab
        v-for="(item, idx) in titles"
        :key="idx"
        style="text-transform: none"
        @click="visitTab(idx)"
      >
        {{ item.data }}
      </v-tab>
    </v-tabs>
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
                      Get started by entering (pasting) a clinical note in the
                      input or by selecting a condition/ phenotype from the
                      autocomplete.
                    </p>
                    <p class="mb-0">
                      The tool "Phenotypr" extracts the phenotypes from the
                      clinical note and presents the terms for selection.
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
                    Review the terms and submit
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Genepanel.iobio utilizes resources such as (Genetic
                      testing registry) GTR, Phenolyzer, and HPO for gene list
                      curation.
                    </p>
                    <p class="mb-0">
                      Select and review the phenotypes to be searched in a
                      single or multiple resources.
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
                    App compiles a comprehensive gene list
                  </v-card-title>
                  <v-card-text>
                    <p>
                      App searches through the selected resources for the added
                      phenotypes/ conditions and generates a comprehensive list
                      of genes associated with these phenotypes.
                    </p>
                    <p class="mb-0">
                      You can also add your own genes to the compiled list.
                      Genes found in multiple resources will be promoted to the
                      top of the list.
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
                    View gene info or export findings
                  </v-card-title>
                  <v-card-text>
                    <p>
                      Top 20 genes are selected by default or you can make
                      custom selection. You can then export these genes to a CSV
                      file with a detailed report or simply copy them to
                      clipboard
                    </p>
                    <p class="mb-0">
                      You can also click on a gene to view its summary,
                      position, and location.
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
      timingInterval: null,
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
    this.timingInterval = setInterval(() => {
      this.scrollTabs();
    }, 10000);
  },
  updated() {},
  watch: {},
  methods: {
    scrollTabs() {
      if (this.tabs === 3) {
        this.tabs = 0;
      } else {
        this.tabs = this.tabs + 1;
      }
    },
    visitTab(idx) {
      clearInterval(this.timingInterval);
      setTimeout(() => {
        this.timingInterval = setInterval(() => {
          this.scrollTabs();
        }, 10000);
      }, 5000);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
</style>
