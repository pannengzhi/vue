import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'utils/request'
import VueAxios from 'vue-axios'
import md5 from 'js-md5'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css' // reset css
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'font-awesome/scss/font-awesome.scss'
import 'styles/index.scss' // global css
import 'utils/directives'

Vue.prototype.$md5 = md5
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI, { locale })
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
