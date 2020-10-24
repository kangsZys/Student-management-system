import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入eventBus
import bus from "@/utils/bus.js"
Vue.prototype.$bus = bus
// 全局引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "./assets/style/base.css"
import "./assets/style/el-reset.css"
import "./assets/iconFonts/iconfont.css"

Vue.use(ElementUI);
Vue.config.productionTip = false;

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 路由前置钩子
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 注册和登入可以给用户访问
  // 其它页面不给访问
  if (to.path === '/login') { // 访问登入页面 那么放行
    next()
  } else { // 访问别的页面
    // 判断是否登入 判断是否有token
    const token = localStorage.getItem('token')
    if (token) {
      const { menuList } = store.state
      if (menuList && menuList.length > 0) {
        next()
      } else {
        store.dispatch('GETMENULIST')
          .then(function () {
            next({ path: to.path })
          })
      }
    } else {
      next({ path: '/login' })
    }
  }
})

// 使用后置路由钩子处理面包屑
router.afterEach((to, from) => {
  NProgress.done()
  // console.log(to);
  let crumbList = to.matched.slice(1)
  // console.log(crumbList);
  store.commit('SET_CRUMBS', crumbList)
})

// console.log(router)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");