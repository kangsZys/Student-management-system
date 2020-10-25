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
export const getstulist = (params = {}) => axios({
	url: '/students/getstulist',
	method: 'get',
	params
})

// 增加学员信息
export const addstu = (stuDetail) => axios({
	url: '/students/addstu',
	method: 'post',
	data: stuDetail
})

// 删除学员信息
export const delStu = (sId) => axios.get(`/students/delstu?sId=${sId}`)

// 修改学员信息
export const updateStu = (updateStuInfo) => axios({
	url: '/students/updatestu',
	method: 'post',
	data: updateStuInfo
})

// 搜索学员
export const seachStu = (params) => {
	return axios({
		url: '/students/searchstu',
		params
	})
}
// 获取班级列表
export const getClasses = () => axios.get(`/students/getclasses`)
