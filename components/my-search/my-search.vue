<template>
	<!-- 自定义搜索组件 -->
	<view class="my-search-container" @click='searchBoxHandler' :style="{ 'background-color': bgcolor }">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-box" :style="{ 'border-radius': radius+'px' }">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 10
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	.my-search-box{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 30px;
		background-color: #ffffff;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>
