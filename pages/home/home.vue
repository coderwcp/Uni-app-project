<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
		
		<!-- 分类导航区域 -->
		<view class="nav">
			<view @click="navClickHandler(item)" class="nav-item" v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" mode="" class="nav-img"></image>
			</view>
		</view>
  
		<!-- 楼层区域 -->
		<view class="floor-list">
		  <!-- 楼层 item 项 -->
		  <view class="floor-item" v-for="(item, index) in floorList" :key="index">
		    <!-- 楼层标题 -->
		    <image :src="item.floor_title.image_src" class="floor-title"></image>
				
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
				  <!-- 左侧大图片的盒子 -->
				  <navigator class="left-img-box" :url="item.product_list[0].url">
				    <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				  </navigator>
				  <!-- 右侧 4 个小图片的盒子 -->
				  <view class="right-img-box">
						<!-- v-if="i2 !== 0" 因为第一张图片占两行，单独处理了，这里循环后面的 -->
				    <navigator class="right-img-item" :url="item2.url" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
				      <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
				    </navigator>
				  </view>
				</view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'HomePage',
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList () {
				const {data} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.swiperList = data.message
			},
			async getNavList(){
				const {data} = await uni.$http.get('/api/public/v1/home/catitems')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.navList = data.message
			},
			async getFloorList () {
				const {data} = await uni.$http.get('/api/public/v1/home/floordata')
				if (data.meta.status !== 200) return uni.$showMsg()
				// 拼接每一楼层区里的每一项 跳转路径
				data.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = `/subpkg/goods_list/goods_list?${prod.navigator_url.split('?')[1]}`
					})
				})
				this.floorList = data.message
			},
			navClickHandler(item) {
				// 判断点击的按钮是否是分类
				if (item.name === '分类') {
					uni.switchTab({
						url:'../cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
swiper {
 height: 330rpx;
 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
.nav{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img{
		width: 120rpx;
		height: 140rpx;
	}
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box {
	display: flex;
	padding-left: 15rpx;
}
</style>

