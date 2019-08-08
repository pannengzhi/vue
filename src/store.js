import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {}, // 用户信息
		addRouters: [], // 后台路由
	},
	getters: { // 引用 this.$store.getters.getUserName
		getUserName(state) {
			return state.user ? state.user.username : ''
		}
	},
	mutations: { // 引用 this.$store.commit('方法名')

	},
	actions: { // 引用 store.dispatch('actionA').then(() => {})

	}
})