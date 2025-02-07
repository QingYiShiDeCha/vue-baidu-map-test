import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Vue3BaiduMapGL from 'vue3-baidu-map-gl'

const app = createApp(App)
app.use(Vue3BaiduMapGL, {
  ak: 'KXHrVO4Q3nkrXVANUk9xeIbwkp0rtkZH',
  plugins: ['Mapvgl', 'Mapv', 'TrackAnimation', 'MapvThree', 'MapvglThreeLayers']
})

app.mount('#app')
