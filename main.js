// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif

import {
	$http
} from '@escook/request-miniprogram'

uni.$http = $http

// #ifdef MP-WEIXIN
//如果是小程序,可以不通过服务器代理,写完整路径
$http.baseUrl = 'https://www.uinav.com'
// #endif
// #ifdef H5
//如果是浏览器,拦截请求的路径
$http.baseUrl = '/api'
// #endif

$http.beforeRequest = function() {
	// 请求前
	uni.showLoading({
		title:'数据加载中...'
	})
}

$http.afterRequest = function() {
	// 请求后
	uni.hideLoading()
}

uni.$showMsg = function(title='数据加载失败!', duration = 1500){
	uni.showToast({
		title,duration,
		icon:'none'
	})
}