import axios from './config'
// 登录
export const login = (username, password) => axios({
	url: '/users/login',
	method: 'post',
	data: {
		username,
		password
	}
})
// 获取登录日志
export const getLoginLog = () => axios({
	url: '/getloginlog',
	method: 'get'
})

// 获取权限菜单
export const getMenuList = () => axios({
	url: '/permission/getMenuList',
	method: 'get'
})

// 获取验证码
export const getCaptcha = () => axios({
	url: '/users/getCaptcha',
	method: 'get'
})

// 校验验证码
export const verifyCaptcha = (captcha) => axios({
	url: `users/verifyCaptcha?captcha=${captcha}`,
	method: 'get'
})

// 获取用户信息
export const getstulist = () => axios({
	url: '/students/getstulist',
	method: 'get'
})

// 增加学员信息
export const addstu = (stuDetail) => axios({
	url: '/students/addstu',
	method: 'post',
	data: stuDetail
})

// 删除学员信息
export const delStu = (sId) => axios.get(`/students/delstu?sId=${sId}`)