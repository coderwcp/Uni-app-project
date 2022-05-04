// 导入 vue 和 vuex
import Vue from "vue"
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'

// 使用 vuex 插件
Vue.use(Vuex)

// 创建 store 实例对象
const store = new Vuex.Store({
	modules: {
		m_cart: moduleCart,
		m_user: moduleUser
	}
})

// 向外共享 store 的实例对象
export default store

