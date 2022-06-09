<template>
  <div>
    <!-- <ParameterBox/> -->
    <!-- <p>loading chart...</p> -->
    <Line
    v-if="this.loaded"
    :width="200"
    :height="200"
    :chart-data="chartData"
    :chart-options="chartOption"
    :chart-id="`${this.deviceID}-${this.field}`"
  />
  <p v-else>Chart is loading...</p>
  </div>
</template>

<script>
// import { startDate, endDate } from "./ParameterBox.vue"
import { Line } from "vue-chartjs";
// import ParameterBox from './ParameterBox.vue';
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
// import "chartjs-adapter-moment";
import dayjs from "dayjs";
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
    // ParameterBox
  },
  data() {
    return {
      loaded: false,
      intervalJob: null,
      smoothness : 30,
      chartData: {},
      chartOption: {
        // plugins: {
        //     title:{
        //         display:true,
        //         text:"Average of past 1 hr"
        //     }
        // }, 
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
    async getChart() {
      this.loaded = false;
      console.log("hello", this.$props.startDate)
      // const startTimestamp = Math.round(this.startDate.getTime()/1000);
      // const endTimestamp = Math.round(this.endDate.getTime()/1000);
      try {
        const res = await fetch(
          `http://localhost:9999/chart?start=${this.startDate}&stop=${this.stopDate}`
        );
        let formatted = (await res.json()).data.map((h) => {
          let output = {};
          output.x = h.time;
          output.y = dayjs(h.value).toDate();
          return output;
        });
        this.chartData = {
          datasets: [
            {
              label: this.field1,
              borderColor: "red",
              data: formatted,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
            {
              label: this.field2,
              borderColor: "blue",
              data: formatted,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
          ],
        };
        this.loaded = true;
      } catch (error) {
          console.log(error)
      }
    },
  },
  props: {
    startDate: Date,
    stopDate: Date,
    t1: String, //topic 1
    t2: String, //topic 2
    t3: String, //topic 3
    field1: String,
    field2: String,
  },
  mounted() {
    this.getChart()
  },
};
</script>

<!-- <script>
//   import LineChart from "../LineChart.js";
      
//   export default {
//     components: {
//       LineChart
//     },
//     // props: {
//     //   t1_humidity: Number,
//     //   t1_temperature: Number,
//     //   t2_humidity: Number,
//     //   t2_temperature: Number,
//     //   t3_humidity: Number,
//     //   t3_temperature: Number
// // },
//     data() {
//       return {
//         datacollection: null,
//         interval: null,
//         time: null,  
//         // t1_h: 0,
//         // t1_t: 0,
//         // t2_h: 0,
//         // t2_t: 0,
//         // t3_h: 0,
//         // t3_t: 0.

//       };
//     },
//     methods: {
//       t1_fillData(t1_humidity, t1_temperature, t2_humidity, t2_temperature, t3_humidity, t3_temperature) {
//         // get current date & time
//         let now = new Date();
//         // let hour = this.zeroPadding(now.getHours());
//         let minute = this.zeroPadding(now.getMinutes());
//         // let second = this.zeroPadding(now.getSeconds());

//         this.datacollection = {
//           // x-axis
//           labels: [minute],
//           datasets: [
//             {
//               label: "dummy-temp-1 Humidity",
//               backgroundColor: "#1A73E8",
//               // y-axis
//               data: [t1_humidity]
//             },
//             {
//               label: "dummy-temp-1 Temperature",
//               backgroundColor: "#2b7518",
//               data: [t1_temperature]
//             },
//             {
//               label: "dummy-temp-2 Humidity",
//               backgroundColor: "#1A73E8",
//               // y-axis
//               data: [t2_humidity]
//             },
//             {
//               label: "dummy-temp-2 Temperature",
//               backgroundColor: "#2b7518",
//               data: [t2_temperature]
//             },
//             {
//               label: "dummy-temp-3 Humidity",
//               backgroundColor: "#1A73E8",
//               // y-axis
//               data: [t3_humidity]
//             },
//             {
//               label: "dummy-temp-3 Temperature",
//               backgroundColor: "#2b7518",
//               data: [t3_temperature]
//             }
//           ]
//         };
//       },
      
      
  
//     },

//     // beforeMount: {
//     //   t1_h : this.t1_humidity,
//     //   t1_t : this.t1_temperature,
//     //   t2_h : this.t2_humidity,
//     //   t2_t : this.t1_temperature,
//     //   t3_h : this.t3_humidity,
//     //   t3_t : this.t1_temperature,
  
//     // },
//     created() {
//       // update the time every second
//       this.interval = setInterval(() => {
//         // Concise way to format time according to system locale.
//         // In my case this returns "3:48:00 am"
//         this.time = Intl.DateTimeFormat(navigator.language, {
//           hour: 'numeric',
//           minute: 'numeric',
//           second: 'numeric'
//         }).format()
//       }, 1000)
//     }
//   };
// </script> -->

<style>

.chart {
  height: 350px;
}

.loading {
  font: normal normal normal 20px/20px Sitka Subheading;
  text-align: center;
  letter-spacing: 0px;
  color: #D4A373;
  opacity: 1;
}
</style>