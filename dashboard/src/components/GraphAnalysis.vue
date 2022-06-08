<script>
  // import io from "socket.io-client";
  import { Line } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
  } from "chart.js";
  // import dayjs from "dayjs";
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale
  );
  export default {
    components: {
      Line,
    },
    data() {
      return {
        duration : 60, 
        smoothness : 30,
        styleBtnChoice: 'btn-choice', 
        loaded: false,
        intervalJob: null,
        chartData: {},
        chartOption: {
          plugins: {
              title:{
                  display:true,
                  text:"Average of past 1 hr"
              }
          }, 
          maintainAspectRatio: false,
          scales: {
            xAxis: {
              type: "time",
              time: {
                unit: "hour",
              },
            },
            y: {
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
        },
      };
    },
    methods: {
      // async getChartHistory() {
      //   this.loaded = false;
      //   try {
      //     const res = await fetch(
      //       `http://localhost:3000/device/chart?deviceID=${this.deviceID}&duration=${this.duration*60}&information=${this.information}&smoothness=${this.smoothness}`
      //     );
      //     let formatted = (await res.json()).data.map((h) => {
      //       let output = {};
      //       output.x = h.time;
      //       output.y = dayjs(h.value).toDate();
      //       return output;
      //     });
      //     this.chartData = {
      //       datasets: [
      //         {
      //           label: this.information,
      //           borderColor: "red",
      //           data: formatted,
      //           cubicInterpolationMode: 'monotone',
      //           tension:0.1,
      //         },
      //       ],
      //     };
      //     this.loaded = true;
      //   } catch (error) {
      //       console.log(error)
      //   }
      // },
      changeGraphLine(duration, smoothness){
          this.duration = duration
          this.smoothness = smoothness
          this.chartOption.plugins.title.text = `Average of past ${this.duration/60} hr`
          // this.getChartHistory()
      }
    },
    props: {
      deviceID: String,
      information: String,
      min: Number,
      max: Number,
    },
    // mounted() {
    //   this.getChartHistory()
    // },
  };
</script>

<template>
    <div class="container">
      <Line
      v-if="this.loaded"
      :width="200"
      :height="200"
      :chart-data="chartData"
      :chart-options="chartOption"
      :chart-id="`${this.deviceID}-${this.information}`"
      />

      <p v-else class = "loading">Loading chart...</p>
      <!-- <div>
          <button :class="styleBtnChoice" @click="this.changeGraphLine(60,30)">1hr</button>
          <button :class="styleBtnChoice" @click="this.changeGraphLine(720, 900)">12hr</button>
          <button :class="styleBtnChoice" @click="this.changeGraphLine(1440, 1800)">24hr</button>
      </div> -->
    </div>
</template>

<style>
.container{
  width: 1150px;
  margin-top: 0px;
  margin-left: 10px;
  height: 450px;
  background: #FEFAE0 0% 0% no-repeat padding-box;
  border-radius: 25px;
  opacity: 1;
  text-align: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.loading{
  font: normal normal normal 20px/20px Sitka Subheading;
  text-align: center;
  letter-spacing: 0px;
  color: #D4A373;
  opacity: 1;
}

</style>