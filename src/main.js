// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import swiper from 'vue-awesome-swiper'
import Vant from 'vant';

import './css/reset.css'
import 'swiper/dist/css/swiper.css'
import 'vant/lib/index.css';

Vue.use(swiper);
Vue.use(ElementUI);
Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
