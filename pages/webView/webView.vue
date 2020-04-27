<template>
	<view class="content" style="height: 100%;">
		<!-- <web-view src="http://saaswx.tlysyun.com:8099/pages/login.html" @message="getMessage"></web-view> -->

		<web-view :src="url" style="height: 100%;"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(e) {
			this.url=e.url
		},
		methods: {}
	}
</script>

<style>
</style>
