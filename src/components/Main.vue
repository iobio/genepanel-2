<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          genepanel.iobio

        </h1>

        <p class="subheading font-weight-regular">
          Generate list of genes based on suspected conditions and phenotypes.
        </p>
      </v-col>


    </v-row>
  </v-container>
</template>

<script>
import NewComponents from 'iobio-phenotype-extractor-vue';

  export default {
    name: 'Main',

    components: {
      ...NewComponents
    },

    data: () => ({

    }),
  }
</script>
