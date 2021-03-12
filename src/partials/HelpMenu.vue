<template>
  <span>
    <v-menu bottom offset-y style="color:black">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon style="padding-right:4px">help</v-icon>
          <strong class="ml-1">HELP</strong>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="onShowTermsOfService">
          <v-list-item-title>Terms of Service</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowDisclaimer">
          <v-list-item-title>Disclaimer</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowSoftwareResources">
          <v-list-item-title>Software and Resources</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="onShowBlog">
          <v-list-item-title>Blog</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onShowIOBIO">
          <v-list-item-title>iobio</v-list-item-title>
        </v-list-item>
        <v-list-item @click="onSupportIOBIO">
          <v-list-item-title>Support the iobio project</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="showDisclaimer" max-width="550">
      <v-card class="full-width">
        <v-card-title class="i_headline">
          {{ disclaimer.headline }}
        </v-card-title>
        <v-card-text>
          <div v-html="disclaimer.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn raised color="white" @click.native="showDisclaimer = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showTermsOfService" max-width="550">
      <v-card class="full-width">
        <v-card-title class="i_headline">
          {{ terms.headline }}
        </v-card-title>
        <v-card-text>
          <div v-html="terms.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn raised color="white" @click.native="showTermsOfService = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showSoftwareResources" max-width="550">
      <v-card class="full-width">
        <v-card-title class="i_headline">
          {{ softwareResources.headline }}
        </v-card-title>
        <v-card-text>
          <div v-html="softwareResources.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            raised
            color="white"
            @click.native="showSoftwareResources = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import NavBarDialog from "./NavBarDialog";
import { bus } from "../main";

export default {
  components: {
    NavBarDialog,
  },
  props: {},
  data() {
    return {
      showDisclaimer: false,
      showTermsOfService: false,
      showSoftwareResources: false,
      disclaimer: {
        headline: "Disclaimer",
        content: `The University of Utah makes no claims that iobio applications,
         including genepanel.iobio are approved for clinical use. All users of iobio applications including genepanel.iobio understand and accept that any information gained by using these applications, whether the information comes from visualization, processing, internal or external databases, or analysis, may not in any way be used for clinical purposes. The University of Utah makes no representation that iobio or genepanel.iobio is either safe or effective for any intended use for which research may currently be performed.
        <br><br>
        iobio, or any iobio applications ARE TO BE USED FOR RESEARCH PURPOSES ONLY. USE FOR CLINICAL PURPOSES IS EXPRESSLY FORBIDDEN. Approval of iobio applications for clinical use has neither been applied for, nor received, in any country, including the United States of America.
        `,
      },
      terms: {
        headline: "Terms of service",
        content: `<strong>Academic Use </strong>
          <br> genepanel.iobio is free for academic use.
          <br><br>
          <strong>Commercial Use </strong>
          <br>
          Commercial use of genepanel.iobio is licensed through Frameshift Genomics. Please contact Frameshift at  <a href="mailto:admin@frameshift.io" target="_top">admin@frameshift.io</a> to discuss any commercial use of this tool.
          `,
      },
      softwareResources: {
        headline: "Software and Resources",
        content: `<div id='credits'><strong class='citation-title'>GTR: Genetic Testing Registry</strong><br>Wendy S. Rubinstein, Donna R. Maglott, Jennifer M. Lee, Brandi L. Kattman, Adriana J. Malheiro, et al. The NIH genetic testing registry: a new, centralized database of genetic tests to enable access to comprehensive information and improve transparency <a href='http://nar.oxfordjournals.org/content/41/D1/D925.full' target='_new'>Nucliec Acids Res. (1 January 2013) 41 (D1): D925–D935 doi.org/10.1093/nar/gks1173</a> <br><ul><li>PubMed ID: 23193275</li><li>PubMed Central ID: PMC3531155</li></ul> Link: <a target='_new' href='https://www.ncbi.nlm.nih.gov/gtr/'> https://www.ncbi.nlm.nih.gov/gtr/</a><br><br>
                  <strong class='citation-title'>Phenolyzer</strong><br>Yang, Hui, Peter N. Robinson, and Kai Wang. Phenolyzer: phenotype-based prioritization of candidate genes for human diseases.<a href='http://www.nature.com/nmeth/journal/v12/n9/abs/nmeth.3484.html' target='_new'>Nature Methods (2015).</a><br>Link: <a target='_new' href='http://phenolyzer.wglab.org/'> http://phenolyzer.wglab.org/</a></div><br><br>
                  <strong class='citation-title'>ClinPhen</strong><br>Deisseroth CA, Birgmeier J, Bodle EE, Kohler JN, Matalon DR, Nazarenko Y, Casie A. Genetti, et al. ClinPhen extracts and prioritizes patient phenotypes directly from medical records to expedite genetic disease diagnosis. Genet Med. 2018.<a href='https://www.nature.com/articles/s41436-018-0381-1' target='_new'>10.1038/s41436-018-0381-1</a><br>Link: <a target='_new' href='http://bejerano.stanford.edu/clinphen/'> http://bejerano.stanford.edu/clinphen/</a></div>`,
      },
      more_menu_icon_color: "rgb(69, 69, 69)",
      showIconButton: true,
      showTextButton: false,
    };
  },
  mounted() {
    bus.$on("close_dialog", () => {
      this.showTermsOfService = false;
      this.showDisclaimer = false;
    });
    this.landingPage == "true"
      ? (this.more_menu_icon_color = "rgb(69, 69, 69)")
      : (this.more_menu_icon_color = "white");
    if (this.landingPage == "true") {
      this.more_menu_icon_color = "rgb(69, 69, 69)";
      this.showIconButton = true;
      this.showTextButton = false;
    } else {
      this.more_menu_icon_color = "white";
      this.showIconButton = false;
      this.showTextButton = true;
    }
  },
  updated() {},
  watch: {},
  methods: {
    onShowTermsOfService: function() {
      this.showTermsOfService = true;
    },
    onShowDisclaimer: function() {
      this.showDisclaimer = true;
    },
    onShowBlog: function() {
      window.open("http://iobio.io/blog.html", "_iobio");
    },
    onShowIOBIO: function() {
      window.open("http://iobio.io", "_iobio");
    },
    onSupportIOBIO: function() {
      window.open("http://iobio.io/support.html", "_iobio");
    },
    onShowSoftwareResources: function() {
      this.showSoftwareResources = true;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

a {
  text-decoration: none !important;
}
</style>
