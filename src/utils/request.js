import axios from 'axios'
import qs from 'qs'
// import router from '@/router'
import { Message } from 'element-ui'
import CONSTANTS from '@/constants'

const service = axios.create({
    baseURL: CONSTANTS, // api的base_url
    timeout: 5000 // 请求超时时间
})
service.interceptors.request.use(
    config => {
        config.headers['x-requested-with'] = 'XMLHttpRequest'
        if (config.method == 'post') {
            config.data = qs.stringify(config.data)
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            return Promise.reject(response.data)
        }
        let data = response.data
        if (data.code < -1) {
            Message({ message: data.message, type: 'error', duration: 5 * 1000 })
            return Promise.reject('error')
        }
        return Promise.resolve(data)
    },
    error => {
        console.error(error)
        Message({ message: error.message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)
    }
)

export default service
