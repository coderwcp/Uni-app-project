<template>
	<view class="goods-item">
		<!-- 商品左侧区域 -->
		<view class="goods-item-left">
			<radio checked="goods.goods_state" @click="radioClickHandler" :color="goods.goods_state ? '#c00000':'#FFF'" v-if="showRadio"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>

		<!-- 商品右侧信息区域 -->
		<view class="goods-item-right">
			<!-- 商品标题 -->
			<view class="goods-name">{{ goods.goods_name }}</view>
			<view class="goods-info-box">
				<!-- 商品价格 -->
				<view class="goods-price">&yen;{{ goods.goods_price | toFixed }}</view>
				<uni-number-box :min="1" @change="numChangeHandler" :value="goods.goods_count" v-if="showNum"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		goods: {
			type: Object,
			default: () => {}
		},
		showRadio: {
			type: Boolean,
			default: false
		},
		// 是否展示商品数量组件
		showNum: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	methods: {
		radioClickHandler() {
			this.$emit('radioChange', {
				goods_id: this.goods.goods_id,
				goods_state: !this.goods.goods_state
			});
		},
		numChangeHandler(e) {
			this.$emit('numChange', {
				goods_id: this.goods.goods_id,
				goods_count: +e // +e 转为数字
			})
		}
	},
	filters: {
		toFixed(num) {
			// 保存两位小数
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;

	.goods-item-left {
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}

	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
		}

		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
