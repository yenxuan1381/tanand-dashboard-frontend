<script>

export default {
    props: {
        meanHumidity: Number,
        meanTemperature: Number,
    }
}
</script>

<template>
    <div>
        <div class="bar">
            <h1 class="subtitle">Mean Humidity</h1>
            <div class="meandata">
                <p>{{ meanHumidity }}%</p>
            </div>

        </div>
        <div class="bar">
            <h1 class="subtitle">Mean Temperature</h1>
            <div class="meandata">
                <p>{{ meanTemperature }}°C</p>
            </div>
        </div>
    </div>
</template>

<style>
.bar {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 400px;
    height: 70px;
    margin: 20px;
    padding: 10px;
    border: 5px;
    font-size: 18px;
    background: #FEFAE0 0% 0% no-repeat padding-box;
    border-radius: 25px;
    opacity: 1;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.subtitle {
    font: normal normal normal 20px/20px Sitka Subheading;
    letter-spacing: 0px;
    color: #D4A373;
    opacity: 1;
    float: left;
    margin-left: 20px;
    margin-top: 35px;
    margin-right: auto;
}

.meandata {
    text-align: right;
    margin-left: auto;
    margin-right: 20px;
    font: normal normal normal 70px/50px Sylfaen;
    letter-spacing: 0px;
    color: #987554;
    text-transform: uppercase;
    opacity: 1;

}
</style>