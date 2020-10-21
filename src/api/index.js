import axios from './config'

export const login = (username, password) => axios({
    url: '/users/login',
    method: 'post',
    data: {
        username,
        password
    }
})

export const getLoginLog = () => axios({
    url: '/getloginlog',
    method: 'get'
})