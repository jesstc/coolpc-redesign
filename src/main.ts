import { createApp } from 'vue'
// import '../mock/index';
import naive from 'naive-ui'
import router from './router';

import './style.css'
// vfonts
import 'vfonts/RobotoSlab.css'
import 'vfonts/FiraCode.css'

import App from './App.vue'

const app = createApp(App);
app.use(naive).use(router).mount('#app');
