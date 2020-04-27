<template>
	<view>
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
		<!--播放器-->
		<view>
			<SongFooter ref="SongFooter"/>
		</view>
	</view>
</template>

<script>
	import airport from '@/common/airport.js'
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	import SongFooter from '../../components/uni-music/SongFooter'
	export default {
		components: {uniIndexedList, SongFooter},
		data() {
			return {
				list: airport.list
			}
		},
		methods: {
			bindClick(e) {
				console.log('点击item，返回数据' + JSON.stringify(e))
			}
		}
	}
</script>

<style>
	
</style>
