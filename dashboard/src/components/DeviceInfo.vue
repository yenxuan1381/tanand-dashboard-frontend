<template>
  <div class="box">
    <h2 class="topic">{{ topic || 'No topic yet' }}</h2>

    <div class="data">
      <p>Humidity : {{ humidity }}%</p>
      <p>Temperature : {{ temperature }}°C</p>
    </div>

  </div>

</template>

<script>
// import { io } from "socket.io-client";

export default { 
  props: {
    topic: String,
    humidity: Number,
    temperature: Number,

  },

  // created() {
  //   const socket = io("http://localhost:9999");
  //   // let self = this;
  //   socket.on("latestdata", async (data) => {
  //     console.log(data)
  //     if (data.deviceId === this.topic) {
  //       this.field.temperature = data.temperature;
  //       this.field.humidity = data.humidity;
  //     }
  //   });
  // }
};
</script>

<style>
.topic {
  font: normal normal normal 40px/60px Sitka Subheading;
  letter-spacing: 0px;
  text-align: center;
  color: #987554;
  opacity: 1;
}

.box {
  width: 300px;
  height: 200px;
  padding: 10px;
  border: 5px;
  font-size: 18px;
  background: #FEFAE0 0% 0% no-repeat padding-box;
  border-radius: 25px;
  opacity: 1;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin: 20px;
  margin-left: auto;
  margin-right: 0;
}

.data {
  font: normal normal normal 20px/20px Sitka Subheading;
  text-align: center;
  letter-spacing: 0px;
  color: #D4A373;
  opacity: 1;
}
</style>