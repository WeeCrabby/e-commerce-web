import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';

import './assets/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);
app.use(router); // Mount the router

app.mount('#app');