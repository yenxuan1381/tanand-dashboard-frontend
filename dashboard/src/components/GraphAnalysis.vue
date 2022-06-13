<template>
  <div>
    <LineChart v-if="this.loaded"  
    :chart-data="chartData" 
    :chart-options="chartOption"
    :borderWidth="borderWidth"
    :width="1450"
    :height="500"/> 
    <p v-else>Chart is loading...</p> 
  </div>
</template>

<script>
import dayjs from "dayjs";
import { Line as LineChart} from "vue-chartjs";
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
    LineChart,
  },
  data() {
    return {
      loaded: false,
      intervalJob: null,
      smoothness: 30,
      chartData: {

      },
      chartOption: {
        // plugins: {
        //   title: {
        //     display: true,
        //     text: "All Data",
        //   }
        // },
        maintainAspectRatio: false,
        responsive: false,
        // scales: {
        //   xAxis: {
        //     type: "time",
        //     time: {
        //       unit: "minute",
        //     },
        //   },
        //   yAxis: {
        //     type: "value"
        //   },
        // },
        // elements: {
        //   point: {
        //     radius: 0,
        //   },
        // },
      },
    };
  },
  watch: {
    startDate(newS, oldS) {
      this.getChart()
      console.log("watch",oldS, newS)
    },
    stopDate(newE, oldE) {
        this.getChart()
        console.log("watch",newE, oldE)
    }

  },
  methods: {
    async getChart() {
      this.loaded = false;
      // console.log("hello", this.startDate)

      const startTimestamp = Math.round(this.startDate.getTime() / 1000);
      const endTimestamp = Math.round(this.stopDate.getTime() / 1000);

      // console.log(startTimestamp, endTimestamp)
      try {
        const res = await fetch(
          // `http://192.168.0.108:9999/chart?start=${startTimestamp}&end=${endTimestamp}`
          // `http://192.168.0.108:9999/chart?start=1654826334&end=1655431134`
          `http://localhost:9999/chart?start=${startTimestamp}&end=${endTimestamp}`

        );
        console.log(res)
        let jsonData = await res.json()
    

        // filter

        let testT1F1 = (jsonData).data.filter((h) => {
          if (h.field == this.field1 && h.device == this.t1) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });

        let testT1F2 = (jsonData).data.filter((h) => {
          if (h.field == this.field2 && h.device == this.t1) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });
        let testT2F1 = (jsonData).data.filter((h) => {
          if (h.field == this.field1 && h.device == this.t2) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });
        let testT2F2 = (jsonData).data.filter((h) => {
          if (h.field == this.field2 && h.device == this.t2) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });
        let testT3F1 = (jsonData).data.filter((h) => {
          if (h.field == this.field1 && h.device == this.t3) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });
        let testT3F2 = (jsonData).data.filter((h) => {
          if (h.field == this.field2 && h.device == this.t3) {
            // let output = [];
            return h;          // add this object into resultData array
          }
        });

        // map the data for each dataset

        // an array of objects
        let t1f1 = (testT1F1).map((h) => {
          // let output = [];
          let output = {};
          output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
          output.y = h.value;     // define object y value
          // console.log(output)
          return output;          // add this object into resultData array
        });

        let t1f2 = (testT1F2).map((h) => {
            // let output = [];
            let output = {};
            output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
            output.y = h.value;     // define object y value
            return output;          // add this object into resultData array
          
        });

        let t2f1 = (testT2F1).map((h) => {
            // let output = [];
            let output = {};
            output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
            output.y = h.value;     // define object y value
            return output;          // add this object into resultData array
          
        });

        let t2f2 = (testT2F2).map((h) => {
            // let output = [];
            let output = {};
            output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
            output.y = h.value;     // define object y value
            return output;          // add this object into resultData array
          
        });

        let t3f1 = (testT3F1).map((h) => {
            // let output = [];
            let output = {};
            output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
            output.y = h.value;     // define object y value
            return output;          // add this object into resultData array
          
        });

        let t3f2 = (testT3F2).map((h) => {
            // let output = [];
            let output = {};
            output.x = dayjs(h.time).format('DD/MM/YY HH:mm');      // define object x value
            output.y = h.value;     // define object y value
            return output;          // add this object into resultData array
          
        });

        // console.log("t1f1", t1f1)

        this.chartData = {
          // labels: ['Test1, Test2, Test3'], // x-axis
          datasets: [
            {
              label: this.t1.concat("-", this.field1),
              borderColor: "red",
              data: t1f1, // y-axis
              cubicInterpolationMode: 'monotone',
              tension: 0.1,
            },
             {
              label: this.t1.concat("-", this.field2),
              borderColor: "pink",
              data: t1f2,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
            {
              label: this.t2.concat("-", this.field1),
              borderColor: "yellow",
              data: t2f1,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
            {
              label: this.t2.concat("-", this.field2),
              borderColor: "purple",
              data: t2f2,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
            {
              label: this.t3.concat("-", this.field1),
              borderColor: "green",
              data: t3f1,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            },
            {
              label: this.t3.concat("-", this.field1),
              borderColor: "blue",
              data: t3f2,
              cubicInterpolationMode: 'monotone',
              tension:0.1,
            }
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

    borderWidth: {
      type: Number,
      default: 2
    },
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