import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'

let app = createApp(App);
app.use(Toast);
app.mount('#app');
