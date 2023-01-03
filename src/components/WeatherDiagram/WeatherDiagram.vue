<script>
// import { defineComponent } from "@vue/runtime-core"
import {weatherChartData} from "./diagramNotification"

import Chart from 'chart.js/auto';

export default{
  name: "WeatherDiagram",
  props:['tempYArr', "hourXArr","selectedFlag"],
  components: {
},
  data() {
    this.chart = null;
    return {
      temp:[],
      hours:[],
      weatherChartData:weatherChartData,
    }
  },
  methods:{
    initDiagram(){
      this.temp = this.tempYArr
      this.chart = new Chart(this.$refs.chart, this.weatherChartData
      );
    },
    updateDiagram(){
      this.weatherChartData.data.labels = this.hourXArr;
      this.weatherChartData.data.datasets[0].data = this.tempYArr;
      this.chart.update();
    }

  },
  computed:{

  },
   watch:{
    tempYArr(){
      this.temp = this.tempYArr;
      console.log(this.temp)
      this.updateDiagram();
    },
  },
  mounted(){
    console.log(this.weatherChartData);
    this.initDiagram();
    this.updateDiagram();
  },
}
  
</script>

<template>
  <div>
    <h2>Diagram</h2>
    {{this.tempYArr}}{{selectedFlag}}
    <div>
      <canvas width="800" id="myChart" ref="chart"></canvas>
    </div>
  </div>
</template>

<style scoped>

</style>
