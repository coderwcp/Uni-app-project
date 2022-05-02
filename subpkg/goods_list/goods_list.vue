<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数
				queryObj: {
					// 查询参数对象
					query: '',
					// 商品分类id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每一页的数据条数
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		// 触底事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			// 判断是否处于加载中
			if(this.isLoading) return
			// 触底将页码加一
			this.queryObj.pagenum += 1
			// 页面加一后请求下一页数据
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false,
			this.goodsList = []
			
			// 重新发起请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		onLoad(option){
			// 将页面参数转存到 this.queryObj 对象中
			Object.assign(this.queryObj, {
				query: option.query || '',
				cid: option.cid || ''
			})
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb) {
				this.isLoading = true
				const {data} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading = false
				// 只要数据请求完毕，按需调用 cb 回调
				cb && cb()
				if ( data.meta.status !== 200) return uni.$showMsg()
				const {message:{total, goods, pagenum}} = data
				// if( total === this.goodsList.length)
				this.total = total
				// 将获取到的商品列表添加到数组中
				this.goodsList = [...this.goodsList, ...goods]
			},
			gotoDetail(item){
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
