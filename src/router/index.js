import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/Login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/Login/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;