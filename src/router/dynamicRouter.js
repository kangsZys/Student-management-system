let dynamicRouter = [
    {
        path: '*',
        name: "404",
        component: () =>
            import(/* webpackChunkName: "404" */ "../pages/Page404/index.vue")
    },
    {
        path: "/",
        name: "home",
        component: () =>
        import(/* webpackChunkName: "home" */ "../pages/Home/index.vue"),
        children: []
    }
]
export default dynamicRouter