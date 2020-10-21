import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 全局引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/style/base.css"
import "./assets/style/el-reset.css"
import "./assets/iconFonts/iconfont.css"

Vue.use(ElementUI);

Vue.config.productionTip = false;

// 路由前置钩子
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: "/login" })
    }
  }
})

import './utils/filterRouter'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");