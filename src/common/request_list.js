//请求首页数据展示列表
import axios from 'axios'
export const getPageList = () => {
    return axios.request({
        url: '/zxiao/findAllByPage',
				method: 'get',
				params:{}
    })
}