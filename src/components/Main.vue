<template>
  <div>
    <div v-if="showLandingPage">
      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>genepanel.iobio</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>
          <v-icon>input</v-icon> 
          <strong class="ml-1">EXPORT</strong>
        </v-btn>
        <v-btn text>
          <v-icon>autorenew</v-icon>
          <strong class="ml-1">CLEAR ALL</strong>
        </v-btn>
        <v-btn text>
          <v-icon>help</v-icon>
          <strong class="ml-1">HELP</strong>
        </v-btn>
      </v-app-bar>
      <div
        dark
        style="height: 500px; background-color: #f9fbff; padding-top: 200px; padding-bottom:100px"
        class="pt-10 elevation-1"
      >
        <v-row
          align="center"
          justify="center"
          style="margin-top: 50px"
        >
          <v-col
            class="text-center"
            cols="12"
            style="color:#45688e"

          >
          
            <h1 class="display-2 font-weight-bold mb-4 mt-5" style="font-weight: 500 !important; font-family: 'Poppins' !important; color: #1976d2 !important">
              genepanel.iobio
            </h1>
            <p class="subheading font-weight-regular">
              Generate list of genes based on suspected conditions and phenotypes.
            </p>
            <v-container>
            </v-container>

            <v-container>
              <div>
              <!-- <v-text-field
                  outlined
                  type="text"
                  id="single_entry_input_landing"
                  ref="single_entry_input_landing"
                  v-model="textNotes"
                  autocomplete="off"
                  v-show="textNotes.length<45"
                  placeholder="Enter Phenotypes or Type (paste) Clinical Note"
                >
                  <template v-slot:append-outer>
                    <v-btn style="margin-top:-10px" large :disabled="textNotes.length<4" @click="extract" color="primary">Submit</v-btn>
                  </template>
                </v-text-field>
                <typeahead
                  v-model="search"
                  hide-details="false"
                  target="#single_entry_input_landing"
                  force-select :force-clear="true"
                  :data="DiseaseNames"
                  :limit="parseInt(100)"
                  v-on:keydown="EnterForSearch"
                  v-on:input="mouseSelect"
                  item-key="DiseaseName"/> -->
                <v-textarea
                  v-show="textNotes.length>=0"
                  v-model="textNotes"
                  ref="single_entry_input_landing_textarea"
                  id="single_entry_input_landing_textarea"
                  name="input-7-4"
                  rows="1"
                  outlined
                >
                  <template v-slot:append-outer>
                    <v-btn style="margin-top:-10px" large :disabled="textNotes.length<4" @click="extract"  color="primary">Submit</v-btn>
                  </template>
                </v-textarea>

                <div style="float: left !important">
                  Try some suggestions: 
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="textNotes='Charcot-Marie-Tooth disease; demyelination; Dejerine sottas disease possibly; sensory neuropathy; hammertoes; difficulty walking'"
                  >
                    Demo clinical note 
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="textNotes='Treacher collins syndrome'"
                  >
                    Treacher collins syndrome
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    outlined
                    small
                    @click="textNotes='Dejerine sottas disease'"

                  >
                    Dejerine sottas disease
                  </v-chip>
                </div>
              </div>
            </v-container>
            <!-- <h4 class="subheading">
              Build your application today!
            </h4> -->
          </v-col>
          
        </v-row>
      </div>

    </div>
    <div v-show="!showLandingPage">
      <v-app-bar
        color="primary"
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>genepanel.iobio</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
            >
              <v-icon>input</v-icon> 
              <strong class="ml-1">EXPORT</strong>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="exportGenes('copyToClipboard')"> 
              <v-list-item-title><v-icon>content_copy</v-icon>&nbsp; &nbsp;Copy genes to clipboard</v-list-item-title>
              <!-- <v-list-item-title><v-icon>save</v-icon>&nbsp; &nbsp;Export genes as CSV</v-list-item-title> -->
            </v-list-item>
            <v-list-item @click="exportGenes('exportToFile')"> 
              <v-list-item-title><v-icon>input</v-icon>&nbsp; &nbsp;Export GTR genes to file</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportGenes('exportAsCSV')"> 
              <v-list-item-title><v-icon>input</v-icon>&nbsp; &nbsp;Export GTR genes to file</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text>
          <v-icon>autorenew</v-icon>
          <strong class="ml-1">CLEAR ALL</strong>
        </v-btn>
        <v-btn text>
          <v-icon>help</v-icon>
          <strong class="ml-1">HELP</strong>
        </v-btn>
      </v-app-bar>

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
          :textNotesLandingPage="textNotesLandingPage">
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
          :exportGenesFlag="exportGenesFlag">
        </GeneList>

      </v-container>
    </div>


    <div v-if="showLandingPage">
      <v-container>
        <h2 class="mt-5" style="font-weight: 500">How it works?</h2>
          <v-stepper class="mt-5">
            <v-stepper-header>
              <v-stepper-step
                complete
                step="1"
              >
                Enter a clinical note or select a condition

              </v-stepper-step>
        
              <v-divider></v-divider>
        
              <v-stepper-step
                complete
                step="2"
              >
                Review the terms and submit
              </v-stepper-step>
        
              <v-divider></v-divider>
        
              <v-stepper-step
                complete
                step="3"
              >
                App compiles a comprehensive gene list
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>

      </v-container>
    </div>
    
  </div>
</template>

<script>
import NewComponents from 'iobio-phenotype-extractor-vue';
import analysisData from '../data/analysis.json';
import { ExportToCsv } from 'export-to-csv';
var FileSaver = require('file-saver');

  export default {
    name: 'Main',

    components: {
      ...NewComponents
    },

    data: () => ({
      gtrGenes: [],
      summaryGeneList: [],
      phenotypes: [],
      analysis: null,
      PhenotypistState: null,
      AddedGenes:[],
      GtrPhenotypes: [],
      venn_diag_data: {},
      geneToDelete: '',
      deletedGenesList: [],
      selectedGenesForGeneSet: [],
      genesTop: 20,
      newTermSearched: false,
      showLandingPage: true,
      textNotes: '',
      textNotesLandingPage: '',
      exportGenesFlag: false,
      exportAction: '',
    }),

    created() {
      this.analysis = analysisData;
    },

    methods: {
      summaryGenes(genes){
        this.summaryGeneList = genes;
        this.analysis.payload.genesReport = this.summaryGeneList;
      },
      saveSearchedPhenotypes(phenotypes){
        console.log("phenotypes", phenotypes)
        this.analysis.payload.phenotypes = phenotypes;
      },
      importedGenes(genes){
        this.AddedGenes = genes;
      },
      PhenolyzerGeneList(genes){
      },
      HpoGeneList(genes){
      },
      GtrGeneList(genes){
      },
      UpdateListOnDelete(genes){
        this.summaryGeneList = genes;
        this.analysis.payload.genesReport = genes;
      },
      vennData(data){
        this.venn_diag_data = data;
      },
      VennDiagramData(obj){
        this.analysis.payload.VennDiagramData = obj
      }, 
      gene_to_delete(gene){
        this.geneToDelete = gene; 
      },
      bus_delete_gene(gene){
        this.deletedGenesList.push(gene);
        this.updateGeneListsOfEachTool();
      },
      updateGeneListsOfEachTool(){
        let phenolyzerCompleteList = this.analysis.payload.phenolyzerFullList;
        let phenolyzer_res = []; 
        phenolyzerCompleteList.map(gene => {
          if(!this.deletedGenesList.includes(gene.name)){
            phenolyzer_res.push(gene);
          }
        })
        this.analysis.payload.phenolyzerFullList = phenolyzer_res;
      },
      add_to_gene_set(genes){
        this.selectedGenesForGeneSet = genes;
      },
      update_genes_top(number){
        this.genesTop = number;
      },
      new_term_searched(flag){
        this.newTermSearched = flag;
      },
      extract(){
        this.showLandingPage = false;
        this.textNotesLandingPage = this.textNotes;
        console.log("this.textNotesLandingPage", this.textNotesLandingPage);
      },
      exportGenes(action){
        this.exportAction = action;
        this.exportGenesFlag=true
      },
      exported_genes(obj){
        console.log("selected", obj.selected);
        console.log("summaryGenes", obj.summary);
        if (this.exportAction === 'copyToClipboard') {
          this.$clipboard(obj.selected.join(", "));
        }
        else if (this.exportAction === 'exportToFile') {
          var blob = new Blob([obj.selected], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(blob, "Genes.txt");  
        }
        else if(this.exportAction === 'exportAsCSV') {
          var data = obj.summary.filter(gene => gene.inGeneSet);
          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Genes',
            useBom: true,
            useKeysAsHeaders: true,
            filename: 'Genes'
          };
          const csvExporter = new ExportToCsv(options);
          csvExporter.generateCsv(data);
        }
        
        this.exportGenesFlag = obj.exportFlag;
        this.exportAction = '';

      },

    }
  }
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
