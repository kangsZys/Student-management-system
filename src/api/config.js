import axios from 'axios'
import ElementUl from 'element-ui'
import router from '../router/index'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://www.chst.vip'

axios.defaults.withCredentials = true

import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner: true});
axios.interceptors.request.use(config => {
    NProgress.done()
    // console.log(config)
    if(config.url === '/users/login'){
        return config
    }else{
        let token = localStorage.getItem('token')
        config.headers['authorization'] = token
        return config
    }
})

axios.interceptors.response.use(config => {
    NProgress.done()
    // console.log(config)
    let {data} = config
    if(data.code === '10022' || data.code === '1004'){
        ElementUl.Message.error('用户信息失效')
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        router.push('/login')
        window.location.reload()
    }
    return config
})

axios.create({
    timeout: 4000
})
export default axios