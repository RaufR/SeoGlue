<template>
  <div>
    <h1>CHART COMPONENT</h1>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
/* eslint-disable */
import ApexCharts from "apexcharts";
import VueApexCharts from "vue-apexcharts";
import HelloWorld from "./HelloWorld";
import HelloWorldVue from "./HelloWorld.vue";

export default {
  name: "ScoreChart",
  components: {
    HelloWorld
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>