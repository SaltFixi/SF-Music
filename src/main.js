import { createApp } from 'vue'
import App from './App.vue'
import plugin from './plugin';

// 引入字体图标
import '//at.alicdn.com/t/font_3409641_796d1rdjivo.js';
import './assets/style/index.scss'
import router from './router';
import store from './store';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(plugin)


app.mount('#app')
