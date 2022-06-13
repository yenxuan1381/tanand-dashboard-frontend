import { createApp } from 'vue'
import App from './App.vue'

import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

app.component('DatePicker', DatePicker);
app.mount('#app');








