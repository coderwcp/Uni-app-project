export default {
	// 为当前模块开启命名空间
	namespaced: true,
	
	state: ()=> ({
		// 从本地获取商品列表
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations: {
		// 添加到购物车
		addToCart (state, goods) {
			// 判断加入的商品是否已经存在购物车里
			const findResult = state.cart.find(t => t.goods_id === goods.goods_id)
			if (!findResult) {
				// 购物车没有该商品
				state.cart.push(goods)
			} else {
				// 购物车已存在该商品
				findResult.goods_count++
			}
			// 添加商品时保存
			this.commit('m_cart/saveToStorage')
		},
		// 持久化保存购物车中的商品
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车商品的勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(t=> t.goods_id === goods.goods_id)
			if(findResult) {
				// 更新对应商品的勾选状态
				findResult.goods_state = goods.goods_state
				// 更新本地
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(t=> t.goods_id === goods.goods_id)
			if(findResult) {
				// 找到对应购物车中的商品，将其数量改为传递过来的数量
				findResult.goods_count = goods.goods_count
				// 修改后进行持久化
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id){
			// 根据id过滤商品
			state.cart = state.cart.filter(t=> t.goods_id !== goods_id)
			// 持久化
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(t => t.goods_state = newState)
			// 持久化
			this.commit('m_cart/saveToStorage')
		}
	},
	actions: {
		addToCart(context, goods) {
			context.commit('addToCart', goods)
		},
		updateGoodsState(context, goods) {
			context.commit('updateGoodsState', goods)
		},
		updateGoodsCount(context, goods) {
			context.commit('updateGoodsCount', goods)
		},
		removeGoodsById(context,goods_id){
			context.commit('removeGoodsById', goods_id)
		},
		updateAllGoodsState(context, newState){
			context.commit('updateAllGoodsState', newState)
		}
	},
	getters: {
		// 统计购物车中的总数量
		total(state) {
			return state.cart.reduce((preValue, item)=> {
				return preValue + item.goods_count
			}, 0)
		},
		checkoutCount(state) {
			return state.cart.reduce((preValue, item) => {
				return preValue + (item.goods_state ? item.goods_count : 0)
			},0)
		},
		totalPrice(state) {
			return state.cart.reduce((preValue, item)=> {
				return preValue + (item.goods_state ? item.goods_count : 0 ) * item.goods_price
			}, 0).toFixed(2)
		}
	}
}