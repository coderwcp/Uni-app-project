<template>
	<view>
		{{params}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {}
			};
		},
		onLoad(option){
			console.log(option)
			this.params = option
		}
	}
</script>

<style lang="scss">

</style>
