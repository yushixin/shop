import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false


import '@/assets/js/rem.js'//引入rem
import '@/assets/css/react.css'//引入样式重试

//按需引入组件
//Button 按钮、Icon 图标、NavBar 导航栏、 Tabbar+TabbarItem 底部导航 、 Swipe, SwipeItem 轮播图
import {Toast,Field,Cell,CellGroup,Tab,Tabs,Button,Icon ,NavBar , Tabbar, TabbarItem,Swipe, SwipeItem,Lazyload } from 'vant';
Vue.use(Toast).use(Field).use(Cell).use(CellGroup).use(Tab).use(Tabs).use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload);

import '@/mock/mock.js';

// import Vant from 'vant';//引入vant组件库
// import 'vant/lib/index.css';
// Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
