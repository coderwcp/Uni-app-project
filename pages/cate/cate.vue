<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scroll-container" :style="{ height: vh + 'px' }">
			<scroll-view class="scroll-left" scroll-y>
				<view :class="{ active: active === index }" class="left-item" @click="item1Click(index)" v-for="(item1, index) in cateList" :key="item1.cat_id">{{ item1.cat_name }}</view>
			</scroll-view>
			<scroll-view class="scroll-right" scroll-y :scroll-top="scrollTop">
				<view class="right-item" v-for="item2 in cateChildren" :key="item2.cat_id">
					<view class="cate-lv2-title">{{ item2.cat_name }}</view>
					<view class="cate-lv3-list">
						<view @click="gotoGoodsList(item3)" class="cate-lv3-item" v-for="item3 in item2.children" :key="item3.cat_id">
							<image :src="item3.cat_icon" mode=""></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import badgeMixin from '@/mixin/tabbar-badge.js';
export default {
	// 将 badgeMix 混入到当前的页面中进行使用
	mixins: [badgeMixin],
	data() {
		return {
			vh: 0,
			cateList: [],
			cateChildren: [],
			active: 0,
			scrollTop: 0
		};
	},
	async onLoad() {
		const sysInfo = await uni.getSystemInfo();
		// 获取视口的高度 = 屏幕高度 - nav高度 - tab高度 - 头部搜索高度
		this.vh = sysInfo[1].windowHeight - 50;
		this.getCateList();
	},
	methods: {
		async getCateList() {
			const { data } = await uni.$http.get('/api/public/v1/categories');
			if (data.meta.status !== 200) uni.$showMsg();
			this.cateList = data.message;
			this.cateChildren = data.message[0].children;
		},
		item1Click(index) {
			this.active = index;
			this.cateChildren = this.cateList[index].children;
			this.scrollTop = this.scrollTop ? 0 : 1;
		},
		gotoGoodsList(item) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
			});
		},
		// 跳转到分包中的search页面
		gotoSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.scroll-container {
	display: flex;
	background-color: #fff;
	.scroll-left {
		width: 120px;
		border-right: 2px solid #eee;
		.left-item {
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			// 激活项的样式
			&.active {
				background-color: #ffffff;
				position: relative;
				// 渲染激活项左侧的红色指示边线
				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	.scroll-right {
		.right-item {
			.cate-lv2-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}
			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.cate-lv3-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
