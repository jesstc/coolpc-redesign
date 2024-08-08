import { createApp } from 'vue'
import naive from 'naive-ui'

import './style.css'
// vfonts
import 'vfonts/RobotoSlab.css'
import 'vfonts/FiraCode.css'

import App from './App.vue'

const app = createApp(App);
app.use(naive).mount('#app');
