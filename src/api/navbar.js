import request from '../utils/request'

export default {
    authList: null,
    user: null,
    getMenuData() {
        return request({
            url: '/LiZhenAPI/api/User/GetAll',
            method: 'get'
        })
    },
    getprems() {
        return request({
            url: '/system/menu/parms',
            method: 'get'
        })
    }
}
