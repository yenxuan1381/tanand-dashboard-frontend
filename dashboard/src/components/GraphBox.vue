<template>
    <div class="bigContainer"> 
        <DatePicker v-model="date" range="" placeholder="Select Range" class="size"></DatePicker>
        <GraphAnalysis
            :t1="t1"
            :t2="t2"
            :t3="t3"
            :field1="this.field1"
            :field2="this.field2"
            :startDate="this.s"
            :stopDate="this.e"
        />
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import GraphAnalysis from '@/components/GraphAnalysis.vue'

export default {
    components: {
        GraphAnalysis
    },
    data(){
        return{
            s: new Date(),
            e: new Date(),  
        }
        
    },


    setup() {
        const date = ref();
        const startDate = ref();
        const endDate = ref();
        onMounted(() => {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
            date.value = [startDate, endDate];
            this.s = startDate;
            this.e = endDate;
            console.log(startDate) //Thu Jun 09 2022 14:18:45 GMT+0800 (Malaysia Time)
            console.log(this.s)
            // this.s = startDate
            // this.e = endDate
        })

        return {
            date,
            startDate,
            endDate
        }
    },
    props: {
        t1: String, //topic 1
        t2: String, //topic 2
        t3: String, //topic 3
        field1: String,
        field2: String,
    },
//     mounted() {
//         console.log(this.s, this.e) // undefined
//   }
}
</script>

<style>
.size {
    width: 350px;
    margin: 20px;
    margin-left: auto;
    margin-right: 20px;
}

.bigContainer {
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
</style>