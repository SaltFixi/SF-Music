import { createApp } from 'vue'
import App from './App.vue'
import plugin from './plugin';

import './assets/style/index.scss'
import router from './router';
import store from './store';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(plugin)


app.mount('#app')
