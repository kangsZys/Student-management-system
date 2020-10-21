import axios from 'axios'
import ElementUl from 'element-ui'
import router from '../router/index'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://www.chst.vip'

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    console.log(config)
    if(config.url === '/users/login'){
        return config
    }else{
        let token = localStorage.getItem('token')
        config.headers['authorization'] = token
        return config
    }
})

axios.interceptors.response.use(config => {
    console.log(config)
    let {data} = config
    if(data.code === '10022' || data.code === '1004'){
        ElementUl.Message.error('用户信息失效')
        // router.push('/login')
    }
    return config
})

axios.create({
    timeout: 4000
})
export default axios