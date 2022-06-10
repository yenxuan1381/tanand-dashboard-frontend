<template>
  <div>
    <!-- <ParameterBox/> -->
    <!-- <p>loading chart...</p> -->
    <!-- <Line
    v-if="this.loaded"
    :bind="true"
    :chart-data="chartData"
    :chart-options="chartOption"
    :chart-id="labels"
  /> -->
  <Line
    v-if="this.loaded"
    :bind="true"
    :chart-data="chartData"
  />
  <p v-else>Chart is loading...</p>
  </div>
</template>

<script>
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
// import "chartjs-adapter-moment";
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
    // ParameterBox
  },
  data() {
    return {
      loaded: false,
      intervalJob: null,
      smoothness : 30,
      chartData: {

      },
      chartOption: {
        plugins: {
            title:{
                display:true,
                text:"All Data"
            }
        }, 
        maintainAspectRatio: false,
        scales: {
          xAxis: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
          yAxis: {
            type: "value"
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
      // console.log("hello", this.startDate)

      const startTimestamp = Math.round(this.startDate.getTime()/1000);
      const endTimestamp = Math.round(this.stopDate.getTime()/1000);

      // console.log(startTimestamp, endTimestamp)
      try {
        const res = await fetch(
          `http://192.168.0.108:9999/chart?start=${startTimestamp}&end=${endTimestamp}`
          // `http://192.168.0.108:9999/chart?start=1654826334&end=1655431134`
        );
        console.log(res)// log the response got from the api

        // console.log("json", await res.json())

        let resultData = (await res.json()).data.map((h) => {
          // let t1f2 = [];
          // let t2f1 = [];
          // let t2f2 = [];
          // let t3f1 = [];
          // let t3f2 = [];
          // console.log("h",h)

          if(h.field == this.field1 && h.device == this.t1){
            // let output = [];
            let t1f1 = {};
            t1f1.x = h.time;
            t1f1.y = h.value;
            return t1f1;
            // t1f1.push(y);
            // return output; // output = {(x,y), (x,y), (x,y)}
          }
          // if(h.field == this.field2 && h.device == this.t1){
          //   // t1f2.x = h.time;
          //   // t1f2.y = dayjs(h.value).toDate();
          //   let y = dayjs(h.value).toDate();
          //   t1f2.push(y);
          // }
          // if(h.field == this.field1 && h.device == this.t2){
          //   // t2f1.x = h.time;
          //   // t2f1.y = dayjs(h.value).toDate();
          //   let y = dayjs(h.value).toDate();
          //   t2f1.push(y);
          // }
          // if(h.field == this.field2 && h.device == this.t2){
          //   // t2f2.x = h.time;
          //   // t2f2.y = dayjs(h.value).toDate();
          //   let y = dayjs(h.value).toDate();
          //   t2f2.push(y);
          // }
          // if(h.field == this.field1 && h.device == this.t3){
          //   // t3f1.x = h.time;
          //   // t3f1.y = dayjs(h.value).toDate();
          //   let y = dayjs(h.value).toDate();
          //   t3f1.push(y);
          // }
          // if(h.field == this.field2 && h.device == this.t3){
          //   // t3f2.x = h.time;
          //   // t3f2.y = dayjs(h.value).toDate();
          //   let y = dayjs(h.value).toDate();
          //   t3f2.push(y);
          // }

        });
        // console.log("t1f1", t1f1)
        console.log(resultData)
        
        this.chartData = {
          // labels: ['Test1, Test2, Test3'], // x-axis
          datasets: [
            {
              label: this.t1.concat("-", this.field1),
              borderColor: "red",
              data: resultData, // y-axis
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