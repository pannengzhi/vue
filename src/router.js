import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Home from 'views/Home'
import axios from 'utils/request'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken} from 'utils/auth' // 验权
Vue.use(Router)
// 不拦截的路由
const constantRouterMap = [
	{path: '/login',component: () => import('views/Login')},
	{
		path: '/',
		component: Home,
		redirect:'/home',
		children: [{
			path: "home",
			name: '主页',
			component: () => import('@/layout/Homepage'),
			meta: {
				title: '主页',
				icon: "fa fa-home",
			}		
		}]
	},
	{path: '/404',component: () => import('views/404')}
]
const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: () => ({y: 0}),
	routes: constantRouterMap
})
export default router
let routers=null //用来获取后台拿到的路由
const whiteList = ['/login', '/404'] // 不拦截白名单
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (getToken()) {
		if (to.path === '/login') {
			next({path: '/'})
			NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
		} else {
			if (!routers) {
				axios.get('mock/menus/build').then(
					data => {
						if (data.menu) {
							store.state.user = data.user
							routers = filterAsyncRouter(data.menu)
							routers.push({path: '*', redirect: '/404'})
							router.addRoutes(routers) //动态添加路由
							next({ ...to,replace: true})
						}
					},
					error => {}
				);
			}
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			routers=null 
			next()
		} else {
			next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
		}
	}
})
router.afterEach(() => {
	NProgress.done() // 结束Progress
})

function filterAsyncRouter(data) {
	let routers = [{path: "/home",name: 'home',meta: {title: '主页',icon: "fa fa-home"}}];
	let map = {}; // 构建map
	const pms = data.map(n => {
		const li = {
			id: n.id,
			pid: n.pid,
			path: n.url === 'Home' ? n.url+n.id : '/'+n.url,
			name: n.name,
			component: n.url === 'Home' ? Home : loadview(n.url),
			meta: {
				title: n.name,
				icon: n.icon
			}
		}
		map[n.id] = li
		return li
	});
	pms.forEach(child => {
		const mapItem = map[child.pid]; // 判断当前数据的parent_id是否存在map中 
		if (mapItem) {
			// 存在则表示当前数据不是最顶层数据
			// 注意: 这里的map中的数据是引用了arr的它的指向还是arr，当mapItem改变时arr也会改变,踩坑点
			(mapItem.children || (mapItem.children = [])).push(child); // 这里判断mapItem中是否存在children, 存在则插入当前数据, 不存在则赋值children为[]然后再插入当前数据
		} else {
			// 不存在则是组顶层数据
			routers.push(child);
		}
	});
	store.state.addRouters = routers
	return routers.map(n => {return !n.children?{
		id: n.id,
		path: '/',
		name: n.name,
		component: Home,
		children: [{
			path: n.path,
			component: n.component,
			meta: {title: n.name,icon: n.icon}
		}]
	}:n});
}

function loadview(url) {
	return () => import(`views/${url}`)
}
