<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-if="searchResult.length ===0" >
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="cleanHistory" type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list" >
				<uni-tag @click="gotoGoodsList(item)" :text="item" v-for="(item,index) in historyList" :key="index"></uni-tag>
			</view>
		</view>
		
		<!-- 搜索建议 -->
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="item in searchResult" @click="gotoDetail(item.goods_id)" :key="item.goods_id">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				showSync: true,
				searchVal: '',
				// 延时器 timer
				timer: null,
				// 搜索关键字
				kw: '',
				// 搜索结果
				searchResult: [],
				historyList: JSON.parse(uni.getStorageSync('kw') || '[]') 
			};
		},
		methods:{
			input(e) {
				// e 获取最新的
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(()=> {
					this.kw = e
					this.getSearchList()
				}, 500) 
			},
			async getSearchList() {
				// 判断搜索关键字是否为空
				if(this.kw.trim() === '') {
					// 清空搜索结果
					this.searchResult = []
					return
				}
				// 不为空，则发起请求，获取搜索建议
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
				console.log(res)
				// 获取失败，提示获取失败
				if(res.meta.status !== 200) return uni.$showMsg()
				// 获取成功，将搜索结果保存
				this.searchResult = res.message
				this.saveSearchHistory()
			},
			gotoDetail(id){
				console.log(id)
				uni.navigateTo({
					// 跳转到对应商品（id）的详情页
					url:'/subpkg/goods_detail/goods_detail?goods_id='+ id
				})
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query='+ item
				})
			},
			saveSearchHistory() {
				// this.historyList.unshift(this.kw)
				
				// 关键字重复的问题
				// 使用 Set 去重
				const set = new Set(this.historyList)
				// 移除对应的元素
				set.delete(this.kw)
				// 添加元素
				set.add(this.kw)
				// 将 Set 对象转为真数组
				this.historyList = Array.from(set)
				// 调用 	uni.setStorageSync(key,value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			cleanHistory() {
				// 清空 data 中的数据
				this.historyList = []
				// 清空本地的搜索历史
				uni.setStorageSync('kw', '[]')
			}
		}
	}
</script>

<style lang="scss" scoped>
.uni-searchbar {
	display: flex;
	flex-direction: row;
	position: relative;
	padding:  16rpx;
	background-color: #c00000;
}
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
.sugg-list {
  padding: 0 5px 0 15px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

</style>
