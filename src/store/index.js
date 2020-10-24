import Vue from "vue";
import Vuex from "vuex";
import {
	getMenuList
} from "@/api/index.js"
import dynamicRouter from "@/router/dynamicRouter.js"
import filterRouter from "@/utils/filterRouter.js"
import allRoutes from "../router/allRoutes";
import router from "../router/index";

Vue.use(Vuex);

let userInfo = localStorage.getItem('userInfo') || '{}'
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
	state: {
		userInfo,
		menuList: [],
		crumbs: [],
		dialogVisible: false,
		stuForm: {
			name: '',
			productUrl: '',
			headimgurl: '',
			class: '',
			age: '',
			city: '',
			degree: '',
			description: ''
		}
	},
	mutations: {
		SET_USERINFO(state, payload) {
			return 1
			state.userInfo = payload
		},
		SETMENULIST(state, payload) {
			state.menuList = payload
			const target = dynamicRouter.find(item => item.path === '/')
			target.children = [...state.menuList]
			// console.log(dynamicRouter)
			router.addRoutes(dynamicRouter)
		},
		//设置面包屑
		SET_CRUMBS(state, payload) {
			state.crumbs = payload
		},
		// 打开dialog
		CHANGEDIALOG(state, payload){
			state.dialogVisible = !state.dialogVisible
		},
		// 更改stuForm数据源
		SET_STUFORM(state,payload){
			state.stuForm = payload
		}
	},
	actions: {
		async GETMENULIST({
			commit
		}) {
			let res = await getMenuList()
			if (res && res.data.state) {
				// console.log(res)
				const userMenu = filterRouter(res.data.menuList, allRoutes)
				commit('SETMENULIST', userMenu)
			}
		}
	},
	modules: {}
});
