import axios from "axios"
import router from '@/router'
import { Notification } from 'element-ui'
import { getToken, removeToken } from './auth'
import qs from "qs"

/****** 创建axios实例 ******/
const service = axios.create({
	baseURL: 'https://pannengzhi.github.io/',//process.env.BASE_URL, // api的base_url
	withCredentials: true, // 开启跨域
	timeout: 5000, // 请求超时时间
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	}
})
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
	if (getToken()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
		config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	if (config.method === 'post' || config.method === 'put') config.data = qs.stringify(config.data)
	return config
}, error => { //请求错误处理
	return Promise.reject(error);
});
/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(response => { //成功请求到数据
	return response.data
}, error => { //响应错误处理
	if (error && error.response) {
		switch (error.response.status) {
			case 401:
				Notification.error({title: '对不起，你没有访问权限！',duration: 2500})
				break;
			case 403:
					removeToken()
					router.replace({path: '/login',query: {redirect: router.currentRoute.fullPath}});
					break;
			case 404:
				Notification.error({title: '网络请求错误',duration: 2500})
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
});
export default service