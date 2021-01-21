<template>
  <div>
    <div v-if="showLandingPage">
      <v-app-bar color="primary" dark>
        <v-toolbar-title class="ml-5">
          <strong>genepanel.iobio</strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>help</v-icon>
          <strong class="ml-1">HELP</strong>
        </v-btn>
        <a
          href="https://bmcmedgenomics.biomedcentral.com/articles/10.1186/s12920-019-0641-1"
          target="_blank"
        >
          <v-btn text>
            <v-icon>book</v-icon>
            <strong class="ml-1">CITATION</strong>
          </v-btn>
        </a>
        <AppsMenu></AppsMenu>
      </v-app-bar>
      <!-- <div
        dark
        style="height: 500px; background-color: #f9fbff; padding-top: 200px; padding-bottom:100px"
        class="pt-10 elevation-1"
      > -->
      <div
        dark
        style="height: 450px; background-color: #f9fbff; padding-top: 150px; padding-bottom:200px"
        class="pt-5 elevation-1"
      >
        <v-row align="center" justify="center" style="margin-top: 30px">
          <v-col class="text-center" cols="12" style="color:#45688e">
            <h1
              class="display-2 font-weight-bold mb-4 mt-5"
              style="font-weight: 500 !important; font-family: 'Poppins' !important; color: #1976d2 !important"
            >
              genepanel.iobio
            </h1>
            <p class="subheading font-weight-regular">
              Generate list of genes based on suspected conditions and
              phenotypes.
            </p>
            <v-container> </v-container>

            <v-container>
              <div>
                <v-text-field
                  outlined
                  type="text"
                  id="single_entry_input_landing"
                  ref="single_entry_input_landing"
                  v-model="textNotes"
                  autocomplete="off"
                  v-show="textNotes.length < 45"
                  placeholder="Enter Phenotypes or Type (paste) Clinical Note"
                >
                  <template v-slot:append-outer>
                    <v-btn
                      style="margin-top:-10px"
                      large
                      :disabled="textNotes.length < 4"
                      @click="extract('typeahead')"
                      color="primary"
                      >Submit</v-btn
                    >
                  </template>
                </v-text-field>
                <typeahead
                  v-model="search"
                  hide-details="false"
                  target="#single_entry_input_landing"
                  force-select
                  :force-clear="true"
                  :data="DiseaseNames"
                  :limit="parseInt(100)"
                  item-key="DiseaseName"
                />
                <v-textarea
                  v-show="textNotes.length >= 45"
                  v-model="textNotes"
                  ref="single_entry_input_landing_textarea"
                  id="single_entry_input_landing_textarea"
                  name="input-7-4"
                  rows="1"
                  outlined
                >
                  <template v-slot:append-outer>
                    <v-btn
                      style="margin-top:-10px"
                      large
                      :disabled="textNotes.length < 4"
                      @click="extract('textarea')"
                      color="primary"
                      >Submit</v-btn
                    >
                  </template>
                </v-textarea>

                <div style="float: left !important">
                  Try some suggestions:
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="
                      textNotes =
                        'Charcot-Marie-Tooth disease; demyelination; Dejerine sottas disease possibly; sensory neuropathy; hammertoes; difficulty walking'
                    "
                  >
                    Demo clinical note
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="textNotes = 'Treacher collins syndrome'"
                  >
                    Treacher collins syndrome
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="textNotes = 'Dejerine sottas disease'"
                  >
                    Dejerine sottas disease
                  </v-chip>
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-show="!showLandingPage">
      <v-app-bar color="primary" dark>
        <v-toolbar-title class="ml-5">
          <strong>genepanel.iobio</strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text>
              <v-icon>input</v-icon>
              <strong class="ml-1">EXPORT</strong>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="exportGenes('copyToClipboard')">
              <v-list-item-title
                ><v-icon>content_copy</v-icon>&nbsp; &nbsp;Copy genes to
                clipboard</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="exportGenes('exportToFile')">
              <v-list-item-title
                ><v-icon>input</v-icon>&nbsp; &nbsp;Export GTR genes to
                file</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="exportGenes('exportAsCSV')">
              <v-list-item-title
                ><v-icon>save</v-icon>&nbsp; &nbsp;Export genes as
                CSV</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text @click="newAnalysisDialog = true">
          <v-icon>autorenew</v-icon>
          <strong class="ml-1">CLEAR ALL</strong>
        </v-btn>
        <v-btn text>
          <v-icon>help</v-icon>
          <strong class="ml-1">HELP</strong>
        </v-btn>
        <a
          href="https://bmcmedgenomics.biomedcentral.com/articles/10.1186/s12920-019-0641-1"
          target="_blank"
        >
          <v-btn text>
            <v-icon>book</v-icon>
            <strong class="ml-1">CITATION</strong>
          </v-btn>
        </a>
        <AppsMenu></AppsMenu>
        <v-btn @click="saveToMosaicDialog = true" color="primary">
          ADD TO MOSAIC
        </v-btn>
      </v-app-bar>

      <v-container>
        <!-- Start newAnalysisDialog  -->
        <v-dialog v-model="newAnalysisDialog" persistent max-width="450">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to clear all?</v-card-title
            >
            <v-card-text class="mt-4">
              Clicking "Yes" will clear all results begin a new analysis.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click.native="forceReload"
                >Yes</v-btn
              >
              <v-btn
                color="blue darken-1"
                text
                @click.native="newAnalysisDialog = false"
                >No</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End newAnalysisDialog -->

        <!-- Start saveToMosaicDialog -->
        <v-dialog v-model="saveToMosaicDialog" persistent max-width="650">
          <v-card>
            <v-card-title class="headline">Save data to Mosaic</v-card-title>
            <v-card-text class="mt-4">
              <v-radio-group v-model="radios" mandatory>
                <v-radio label="Save analysis" value="radio-analysis"></v-radio>
                <v-radio label="Save gene list" value="radio-genes"></v-radio>
              </v-radio-group>
              <div v-if="radios === 'radio-analysis'">
                <h4>Analysis information</h4>
                <br />
                <v-text-field
                  label="Name"
                  v-model="mosaic_analysis_name"
                ></v-text-field>
                <v-text-field
                  label="Description"
                  v-model="mosaic_analysis_description"
                ></v-text-field>
              </div>
              <div v-if="radios === 'radio-genes'">
                <h4>Gene list information</h4>
                <br />
                <v-text-field
                  label="Name"
                  v-model="mosaic_genelist_name"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                v-if="radios === 'radio-analysis'"
                @click="saveAnalysisToMosaic"
              >
                Save analysis
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                v-if="radios === 'radio-genes'"
                @click="exportGenes('saveGenelistToMosaic')"
              >
                Save gene list
              </v-btn>

              <v-btn
                color="blue darken-1"
                text
                @click.native="saveToMosaicDialog = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- End saveToMosaicDialog -->
      </v-container>

      <v-container>
        <PhenotypeExtractor
          :phenotypes="analysis.payload.phenotypes"
          :summaryFullGeneList="analysis.payload.summaryGeneList"
          @summaryGenes="summaryGenes($event)"
          @saveSearchedPhenotypes="saveSearchedPhenotypes($event)"
          :VennDiagramData="analysis.payload.VennDiagramData"
          @GtrGeneList="GtrGeneList($event)"
          @PhenolyzerGeneList="PhenolyzerGeneList($event)"
          @HpoGeneList="HpoGeneList($event)"
          :AddedGenes="AddedGenes"
          @vennData="vennData($event)"
          :demoTextNote="analysis.payload.demoTextNote"
          @VennDiagramData="VennDiagramData($event)"
          :geneToDelete="geneToDelete"
          @new_term_searched="new_term_searched($event)"
          :textNotesLandingPage="textNotesLandingPage"
        >
        </PhenotypeExtractor>

        <GeneList
          :summaryGeneList="analysis.payload.genesReport"
          @importedGenes="importedGenes($event)"
          @UpdateListOnDelete="UpdateListOnDelete($event)"
          :phenotypeTerms="analysis.payload.phenotypes"
          :venn_diag_data="venn_diag_data"
          @bus_delete_gene="bus_delete_gene"
          @gene_to_delete="gene_to_delete($event)"
          @add_to_gene_set="add_to_gene_set($event)"
          :selectedGenesForGeneSet="analysis.payload.selectedGenesForGeneSet"
          @update_genes_top="update_genes_top($event)"
          :topGenesSelectedCount="analysis.payload.genesTop"
          :newTermSearched="newTermSearched"
          @exported_genes="exported_genes($event)"
          :exportGenesFlag="exportGenesFlag"
          :gtrResourceUsed="gtrResourceUsed"
          :hpoResourceUsed="hpoResourceUsed"
          :PhenolyzerResourceUsed="PhenolyzerResourceUsed"
        >
        </GeneList>
      </v-container>
    </div>

    <div v-if="showLandingPage">
      <v-container>
        <h2 class="mt-5" style="font-weight: 500">How it works?</h2>
        <tab-slider> </tab-slider>
      </v-container>

      <hr />
      <v-container> </v-container>
    </div>
  </div>
</template>

<script>
import AppsMenu from "../partials/AppsMenu";

import NewComponents from "iobio-phenotype-extractor-vue";
import analysisData from "../data/analysis.json";
import { ExportToCsv } from "export-to-csv";
var FileSaver = require("file-saver");

import { Typeahead } from "uiv";

import DiseaseNamesData from "../data/DiseaseNames.json";
import DiseaseNames from "../data/DiseaseNamesCleaned.json";
import TabSlider from "../partials/TabSlider.vue";

import MosaicSession from "../models/MosaicSession";

export default {
  name: "Main",

  components: {
    ...NewComponents,
    AppsMenu,
    TabSlider,
  },

  props: {
    paramDebug: null,
    paramAnalysisId: null,
    paramProjectId: null,
    paramSampleId: null,
    paramAnalysisId: null,
    paramTokenType: null,
    paramToken: null,
    paramSource: null,
    paramIobioSource: null,
    paramGeneBatchSize: null,
    paramClientApplicationId: null,
    paramBuild: null,
    paramGeneSetId: null,
    paramGenes: null,
    paramVariantSetId: null,
  },

  data: () => ({
    gtrGenes: [],
    summaryGeneList: [],
    phenotypes: [],
    analysis: null,
    PhenotypistState: null,
    AddedGenes: [],
    GtrPhenotypes: [],
    venn_diag_data: {},
    geneToDelete: "",
    deletedGenesList: [],
    selectedGenesForGeneSet: [],
    genesTop: 20,
    newTermSearched: false,
    showLandingPage: true,
    textNotes: "",
    textNotesLandingPage: "",
    exportGenesFlag: false,
    exportAction: "",
    newAnalysisDialog: false,
    search: "",
    gtrResourceUsed: false,
    hpoResourceUsed: false,
    PhenolyzerResourceUsed: false,
    launchedFromMosaic: true,
    saveToMosaicDialog: false,
    radios: "radio-analysis",
    mosaicSession: null,
    mosaic_analysis_name: "",
    mosaic_analysis_description: "",
    mosaic_genelist_name: "",
    params: {},
    caseSummary: {},
  }),

  created() {
    this.analysis = analysisData;
    if (this.launchedFromMosaic) {
      this.showLandingPage = false;
    }
  },

  mounted() {
    this.init();
  },

  watch: {
    launchedFromMosaic() {
      if (this.launchedFromMosaic) {
        this.showLandingPage = false;
      }
    },
  },

  computed: {
    DiseaseNames: function() {
      return DiseaseNames.data.sort(function(a, b) {
        if (a.DiseaseName < b.DiseaseName) {
          return -1;
        } else if (a.DiseaseName > b.DiseaseName) {
          return 1;
        } else {
          return 0;
        }
      });
    },
  },

  methods: {
    init() {
      let self = this;
      if (
        localStorage.getItem("hub-iobio-tkn") &&
        localStorage.getItem("hub-iobio-tkn").length > 0 &&
        self.paramSampleId &&
        self.paramSource
      ) {
        self.params.sample_id = self.paramSampleId;
        self.params.analysis_id = self.paramAnalysisId;
        self.params.project_id = self.paramProjectId;
        self.params.source = self.paramSource;
        self.params.iobio_source = self.paramIobioSource;
        self.params.client_application_id = self.paramClientApplicationId;
        self.params.gene_set_id = self.paramGeneSetId;
        self.params.genes = self.paramGenes;
        self.params.variant_set_id = self.paramVariantSetId;

        if (self.params.analysis_id == "undefined") {
          self.params.analysis_id = null;
        }
        if (self.params.iobio_source == "undefined") {
          self.params.iobio_source = null;
        }

        self.launchedFromMosaic = true;
        self.mosaicSession = new MosaicSession();
        self.mosaicSession
          .promiseInit(
            self.params.sample_id,
            self.params.source,
            true,
            self.params.project_id,
            self.params.client_application_id,
            self.params.gene_set_id,
            self.params.variant_set_id
          )
          .then((data) => {
            self.modelInfos = data.modelInfos;
            self.user = data.user;
            self.geneSet = data.geneSet;

            self.mosaicSession
              .promiseGetProject(self.params.project_id)
              .then(function(project) {
                self.caseSummary = {};
                self.caseSummary.name = project.name;
                self.caseSummary.description =
                  project.description && project.description.length > 0
                    ? project.description
                    : "A summary of the trio goes here....";
              });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    summaryGenes(genes) {
      this.summaryGeneList = genes;
      this.analysis.payload.genesReport = this.summaryGeneList;
    },
    saveSearchedPhenotypes(phenotypes) {
      console.log("phenotypes", phenotypes);
      this.analysis.payload.phenotypes = phenotypes;
    },
    importedGenes(genes) {
      this.AddedGenes = genes;
    },
    PhenolyzerGeneList(genes) {},
    HpoGeneList(genes) {},
    GtrGeneList(genes) {},
    UpdateListOnDelete(genes) {
      this.summaryGeneList = genes;
      this.analysis.payload.genesReport = genes;
    },
    vennData(data) {
      this.venn_diag_data = data;
    },
    VennDiagramData(obj) {
      this.analysis.payload.VennDiagramData = obj;
    },
    gene_to_delete(gene) {
      this.geneToDelete = gene;
    },
    bus_delete_gene(gene) {
      this.deletedGenesList.push(gene);
      this.updateGeneListsOfEachTool();
    },
    updateGeneListsOfEachTool() {
      let phenolyzerCompleteList = this.analysis.payload.phenolyzerFullList;
      let phenolyzer_res = [];
      phenolyzerCompleteList.map((gene) => {
        if (!this.deletedGenesList.includes(gene.name)) {
          phenolyzer_res.push(gene);
        }
      });
      this.analysis.payload.phenolyzerFullList = phenolyzer_res;
    },
    add_to_gene_set(genes) {
      this.selectedGenesForGeneSet = genes;
    },
    update_genes_top(number) {
      this.genesTop = number;
    },
    new_term_searched(flag) {
      this.newTermSearched = flag;
    },
    extract(type) {
      if (type === "typeahead") {
        if (this.search.DiseaseName !== undefined) {
          this.textNotesLandingPage = this.search.DiseaseName;
        } else {
          this.textNotesLandingPage = this.textNotes;
        }
      } else if (type === "textarea") {
        this.textNotesLandingPage = this.textNotes;
      }
      this.showLandingPage = false;
    },
    exportGenes(action) {
      this.exportAction = action;
      this.exportGenesFlag = true;
    },
    getSearchTermsForCSV(data) {
      if (data.length) {
        var arr = [];
        data.map((term) => {
          var searchTerm = term.searchTerm;
          arr.push(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1));
        });
        return arr.join(", ");
      } else {
        return " ";
      }
    },
    getHpoPhenotypeForCSV(data) {
      if (data.length) {
        var arr = [];
        data.map((term) => {
          var hpoPhenotype = term.hpoPhenotype;
          arr.push(
            hpoPhenotype.charAt(0).toUpperCase() + hpoPhenotype.slice(1)
          );
        });
        return arr.join(", ");
      } else {
        return " ";
      }
    },
    exported_genes(obj) {
      if (this.exportAction === "copyToClipboard") {
        this.$clipboard(obj.selected.join(", "));
      } else if (this.exportAction === "exportToFile") {
        var blob = new Blob([obj.selected], {
          type: "text/plain;charset=utf-8",
        });
        FileSaver.saveAs(blob, "Genes.txt");
      } else if (this.exportAction === "exportAsCSV") {
        var data = obj.summary.filter((gene) => gene.inGeneSet);
        var csv_data = data.map((gene) => {
          return {
            gene_name: gene.name,
            sources: gene.source.join(),
            gene_id: gene.geneId !== undefined ? gene.geneId : " ",
            searchTermsGtr: this.getSearchTermsForCSV(gene.searchTermsGtr),
            searchTermsPhenolyzer: this.getSearchTermsForCSV(
              gene.searchTermsPhenolyzer
            ),
            searchTermHpo: this.getSearchTermsForCSV(gene.searchTermHpo),
            hpoPhenotype: this.getHpoPhenotypeForCSV(gene.searchTermHpo),
          };
        });
        const options = {
          fieldSeparator: ",",
          quoteStrings: '"',
          decimalseparator: ".",
          showLabels: true,
          showTitle: true,
          title: "Genes",
          useBom: true,
          // useKeysAsHeaders: true,
          filename: "Genes",
          headers: [
            "Gene Name",
            "Source(s)",
            "Gene ID",
            "GTR Search term",
            "Phenolyzer search term",
            "HPO ID",
            "HPO Phenotype",
          ],
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(csv_data);
      } else if (this.exportAction === "saveGenelistToMosaic") {
        this.saveGenelistToMosaic(obj.selected);
      }

      this.exportGenesFlag = obj.exportFlag;
      this.exportAction = "";
    },
    forceReload() {
      window.location.reload();
    },
    PhenolyzerGeneList(genes) {
      if (genes.length === 0) {
        this.PhenolyzerResourceUsed = false;
      } else if (genes.length > 1) {
        this.PhenolyzerResourceUsed = true;
      }
    },
    HpoGeneList(genes) {
      if (genes.length === 0) {
        this.hpoResourceUsed = false;
      } else if (genes.length > 1) {
        this.hpoResourceUsed = true;
      }
    },
    GtrGeneList(genes) {
      if (genes.length === 0) {
        this.gtrResourceUsed = false;
      } else if (genes.length > 1) {
        this.gtrResourceUsed = true;
      }
    },
    saveGenelistToMosaic(genes) {
      var analysis = {
        genes: genes,
        name: this.mosaic_genelist_name,
      };
      console.log("analysis", analysis);
    },
    saveAnalysisToMosaic() {},
  },
};
</script>

<style lang="sass" scoped>
#single_entry_input
  width: 600px
  height: 49px
  margin-top: 7px
  border: 0
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
  border-radius: 0
  font-size: 16px

#single_entry_input_textarea
  width: 600px
  margin-top: 7px

#single_entry_input_landing
  width: 600px
  height: 49px
  margin-top: 7px
  border: 0
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
  border-radius: 0
  font-size: 16px

#single_entry_input_landing_textarea
  width: 600px
  margin-top: 7px


.reviewCard
  height: 250px
  overflow-y: auto

.v-parallax
  background-color: #f9fbff


@media (min-width: 960px)
  .container
    max-width: 960px

@media (min-width: 1050px)
  .container
    max-width: 1050px

@media (min-width: 1175px)
  .container
    max-width: 1175px

@media (min-width: 1264px)
  .container
    max-width: 1264px

@media (min-width: 1330px)
  .container
    max-width: 1330px

@media (min-width: 1440px)
  .container
    max-width: 1440px

@media (min-width: 1550px)
  .container
    max-width: 1550px

@media (min-width: 1635px)
  .container
    max-width: 1635px
</style>
