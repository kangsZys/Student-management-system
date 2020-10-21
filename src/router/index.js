import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import allRoutes from "./allRoutes"
import home from "../pages/Home/index.vue"

const routes = [
  {
    path: "/Login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/Login/index.vue")
  },
  { 
    path: '*', 
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../pages/Page404/index.vue")
  },
  {
    path: "/",
    name: "home",
    component: home,
    children: allRoutes
  }
];

const router = new VueRouter({
  routes
});

export default router;