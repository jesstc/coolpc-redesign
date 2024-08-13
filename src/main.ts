import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import '../mock/index';
import router from './router';

// vfonts
import 'vfonts/RobotoSlab.css'
import 'vfonts/FiraCode.css'
import './style.css'

import App from './App.vue'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
