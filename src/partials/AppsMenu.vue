<template>
  <v-menu bottom offset-y style="color:black">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        <v-icon style="padding-right:4px">apps</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title
          ><a href="http://gene.iobio.io/" target="_blank">gene.iobio</a>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title
          ><a href="http://clin.iobio.io/" target="_blank">clin.iobio</a>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title
          ><a href="http://bam.iobio.io/" target="_blank">bam.iobio</a>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title
          ><a href="http://vcf.iobio.io/" target="_blank">vcf.iobio</a>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      alert: true,
    };
  },
  mounted() {},
  updated() {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");

a {
  text-decoration: none !important;
}
</style>
