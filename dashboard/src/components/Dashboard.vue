<template>

    <div class="wrapper">
        <div class="one">
            <h1 class="title">Data Analysis</h1>
        </div>

        <div class="two">
            <MeanData />
        </div>

        <div class="three">
            <GraphAnalysis />
        </div>

        <div class="four">
            <DeviceInfo :topic="topic1" :humidity="t1.humidity" :temperature="t1.temperature"/>
            <DeviceInfo :topic="topic2" :humidity="t2.humidity" :temperature="t2.temperature"/>
            <DeviceInfo :topic="topic3" :humidity="t3.humidity" :temperature="t3.temperature"/>
        </div>
    </div>

</template>

<script>
import DeviceInfo from '@/components/DeviceInfo.vue'
import MeanData from '@/components/MeanData.vue'
import GraphAnalysis from '@/components/GraphAnalysis.vue'
import { io } from "socket.io-client";

export default {
    name: 'app',
    components: {
        DeviceInfo,
        MeanData,
        GraphAnalysis,
    },

    data() {
        return {
            topic1: 'dummy-temp-1',
            topic2: 'dummy-temp-2',
            topic3: 'dummy-temp-3',
            field1: 'Humidity',
            field2: 'Temperature',

            t1: {
                humidity: 0,
                temperature: 0
            },
            t2: {
                humidity: 0,
                temperature: 0
            },
            t3: {
                humidity: 0,
                temperature: 0
            },
            mean: {
                humidity:0,
                temperature:0
            }

        }
    },

    watch:{
        calculateMean() {
            this.mean.temperature = (this.t1.temperature + this.t2.temperature + this.t3.temperature)/3;
            this.mean.humidity = (this.t1.humidity + this.t2.humidity + this.t3.humidity)/3;
        }
    },

    methods: {
        
        
    },
    created() {
    const socket = io("http://localhost:9999");
    socket.on("latestdata", async (data) => {
      console.log(data)
      if (data.deviceId === this.topic1) {
        this.t1.temperature = data.temperature;
        this.t1.humidity = data.humidity;
      }
      if (data.deviceId === this.topic2) {
        this.t2.temperature = data.temperature;
        this.t2.humidity = data.humidity;
      }
      if (data.deviceId === this.topic3) {
        this.t3.temperature = data.temperature;
        this.t3.humidity = data.humidity;
      }
    });
  }


}

</script>

<style>
.title {
    width: 300px;
    margin-left: 50px;
    text-align: left;
    font: normal normal normal 80px/80px Cambria Math;
    letter-spacing: 0px;
    color: #987554;
    opacity: 1;
}

.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

.one {
    width: 700px;
    grid-column: 1;
    grid-row: 1;
}

.two {
    grid-column: 2;
    grid-row: 1;
}

.three {
    grid-column: 1 / 3;
    grid-row: 2 / 4;
}

.four {
    grid-column: 3;
    grid-row: 1 / 4;
}
</style>
