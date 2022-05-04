<template>
	<view class="cart-container">
		<my-address></my-address>

		<!-- 购物车标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :showNum="true" @radioChange="radioChangeHandler" :showRadio="true" @numChange="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

		<my-settle></my-settle>
	</view>
</template>

<script>
import badgeMixin from '@/mixin/tabbar-badge.js';
import { mapState, mapActions } from 'vuex';
export default {
	// 将 badgeMix 混入到当前的页面中进行使用
	mixins: [badgeMixin],
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}
			]
		};
	},
	methods: {
		...mapActions('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
		// 购物车中商品的选中状态变化
		radioChangeHandler(e) {
			this.updateGoodsState(e);
		},
		// 添加商品数量或则减少商品数量
		numChangeHandler(e) {
			this.updateGoodsCount(e);
		},
		// 删除购物车中的商品
		swipeActionClickHandler(goods) {
			this.removeGoodsById(goods.goods_id);
		}
	},
	computed: {
		...mapState('m_cart', ['cart'])
	}
};
</script>

<style lang="scss">
.cart-container {
	padding-bottom: 50px;
}
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		margin-left: 10px;
	}
}
.goods-item {
	// 让 goods-item 项占满整个屏幕的宽度
	width: 750rpx;
	// 设置盒模型为 border-box
	box-sizing: border-box;
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
}
</style>
