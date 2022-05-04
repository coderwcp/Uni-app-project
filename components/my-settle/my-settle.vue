<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container" v-if="total !== 0">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio :color="isFullCheck ? '#c00000': '#fff'" :checked="isFullCheck" />
			<text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">&yen;{{totalPrice}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkoutCount}})</view>
	</view>
	<view class="empty-cart" v-else>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
	data() {
		return {};
	},
	methods:{
		...mapActions('m_cart', ['updateAllGoodsState']),
		changeAllState() {
			this.updateAllGoodsState(!this.isFullCheck)
		}
	},
	computed: {
		...mapGetters('m_cart', ['checkoutCount','total','totalPrice']),
		isFullCheck(){
			return this.total === this.checkoutCount
		}
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	// 将背景色从 cyan 改为 white
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;

	.radio {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
		margin-left: 5px;
	}

	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
