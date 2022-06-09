import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const store = createStore({
    state () {
      return {
        start: new Date(),
        end: new Date(),

      }
    },
    mutations: {
      changeDate (state, startDate, endDate) {
        state.start = startDate;
        state.end = endDate;
      }
    }
  })

    // console.log(this.$store.state.start)
    // console.log(this.$store.state.stop)

const app = createApp(App);

app.component('DatePicker', DatePicker);

app.use(store).mount('#app');

// createApp(App).mount('#app')






