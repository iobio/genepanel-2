<template>
  <div>
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

    <v-container>
      <v-row class="text-center">
        <v-col class="mb-4 mt-5 pt-5">
          <h1 class="display-2 font-weight-bold mb-3">
            genepanel.iobio

          </h1>

          <p class="subheading font-weight-regular">
            Generate list of genes based on suspected conditions and phenotypes.
          </p>
        </v-col>
      </v-row>
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
        @new_term_searched="new_term_searched($event)">
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
        :newTermSearched="newTermSearched">
      </GeneList>

    </v-container>
  </div>
</template>

<script>
import NewComponents from 'iobio-phenotype-extractor-vue';
import analysisData from '../data/analysis.json';

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
      }
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

  .reviewCard
    height: 250px
    overflow-y: auto


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
