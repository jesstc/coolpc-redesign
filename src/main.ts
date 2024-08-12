import { createApp } from 'vue'
// import '../mock/index';
import router from './router';

// vfonts
import 'vfonts/RobotoSlab.css'
import 'vfonts/FiraCode.css'

import './style.css'

import App from './App.vue'

const app = createApp(App);
app.use(router).mount('#app');
