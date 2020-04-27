
<template>
	<view class="tpl-index with-navbar">
		<!--banner-->
		<view class="content">
			<special-banner :banner-list="bannerList" :swiper-config="swiperConfig"></special-banner>
		</view>
		<view class="menu">
			<navigator :url="one.url" class="one" v-for="(one, index) of menu">
				<!-- <image class="image" :src="one.image" mode=""></image> -->
				<view class="icon-box"><text class="iconfont " :class="[one.icon]"></text></view>
				<text class="text">{{ one.name }}</text>
			</navigator>
		</view>
		<!--推荐歌单-->
		<View @click="go('推荐歌单')" class="cell-title" style="color: #ffffff;background-color: #121429;">
		    推荐歌单
		    <van-icon name="arrow" size="20px" color="#999" />
		</View>
		<View class="cell-SongSheet" style="background-color: #121429;">
		    <SongSheet
		        v-for="(item, index) in PersonalizedList"
		        :key="index"
		        :Oid="item.id"
		        :name="item.name"
		        :picUrl="item.picUrl + '?imageView&thumbnail=250x0'"
		        :playCount="item.playCount"
		    />
		</View>
		<!--新歌首发 -->
		
		<!--播放器-->
		<view>
			<SongFooter ref="SongFooter"/>
		</view>
	</view>
</template>

<script>
	import specialBanner from '../../components/specialBanner.vue'
	import SongFooter from "../../components/uni-music/SongFooter"
	import itemContainer from '@/components/index/item-container.vue'
	import { getBanner, getPersonalized, toplist } from "../../api/index";
	import VanIcon from "../../wxcomponents/vant-weapp/icon/index";
	import SongSheet from "../../components/uni-music/SongSheet";
	export default {
		components: {
			specialBanner,
			SongFooter,
			itemContainer,
			SongSheet, 
			VanIcon
		},
		data() {
			return {
				PersonalizedList: [], //推荐歌单
				bannerList: [],//banner轮播图
				current: 0,
				menu: [
					{
						name: '乐库',
						image: '../../../static/icon/yueku.png',
						icon: 'icon-yinyue1',
						url: '../musiclibrary/index'
					},
					{
						name: '歌单',
						image: 'http://face.amyun.cn/static/img/nav4.d261107.png',
						icon: 'icon-gedanshouye',
						url: '../songsheet/songsheet'
					},
					{
						name: '歌手',
						image: 'http://face.amyun.cn/static/img/nav3.fb68282.png',
						icon: 'icon-danchuang_geshou_',
						url: '../singer/singer'
					},
					{
						name: '排行榜',
						image: 'http://face.amyun.cn/static/img/nav2.0ceacd3.png',
						icon: 'icon-paihangbang',
						url: '../ranking/rankinglist'
					}
				],
				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58rpx',
					nextMargin: '58rpx'
			}
		}
	},
	onNavigationBarButtonTap(e) {
	    uni.navigateTo({
	    	url: `/pages/search/index`
	    });	
	},
	onShow() {
		console.log(this);
	    this.$store.state.audio.onCanplay(() => {
	        //更新底部播放的状态
	        this.$refs.SongFooter.update();
	        //因为vuex不能直接在模板内更新
	        this.$refs.SongFooter.updateStore();
	        this.$refs.Hot.updateStore();
	    });
	    //   监听播放和暂停事件
	    this.$store.state.audio.onPlay(() => {
	        this.$refs.SongFooter.onPlay();
	        this.$refs.SongFooter.updateStore();
	        this.$refs.Hot.updateStore();
	    });
	    this.$store.state.audio.onPause(() => {
	        this.$refs.SongFooter.onPause();
	        this.$refs.SongFooter.updateStore();
	        this.$refs.Hot.updateStore();
	    });
	    if (this.$store.state.audio.id) {
	        this.$refs.SongFooter.Draw();
	        this.$refs.SongFooter.updateStore();
	        this.$refs.Hot.updateStore();
	    }
	},
	onLoad() {
		this.getBanner();
	},
	created() {
	    uni.showLoading({
	        title: "loading"
	    });
	
	    Promise.all([
	        this.getPersonalized(),
	    ]).then(() => {
	        uni.hideLoading();
	    });
	},
	methods: {
		go(title) {
		    uni.navigateTo({
		        url: `/pages/PersonalizedList/index?name=${title}`
		    });
		},
		/*
		* 获取bannerList轮播图
		*/
	   getBanner(){
		   let data = {
			   column:"picture,title,description,path"//需要的字段名
		   };
		   uni.request({
		   	url:'http://47.92.193.229:100/index.php/api/song/banner',
			data:data,
			success: (data) => {
					for(let bannerData of data.data.bannerlist){
						this.bannerList.push({
							picture:bannerData.picture,
							title:bannerData.title,
							description:bannerData.description,
							path:bannerData.path
						});
					}
					console.log(this.bannerList);
				}
		   })
	   },
		/**
		 * 获取推荐歌单
		 * @method getBanner
		 * @return {Promise}
		 */
		getPersonalized() {
		    getPersonalized().then(res => {
				console.log(res);
		        let random = Math.floor(
		            Math.random() * (res.result.length - 5)
		        );
		        // 随机取6个
		        for (let item of res.result.slice(random, random + 6)) {
		            this.PersonalizedList.push({
		                id: item.id,
		                name: item.name,
		                picUrl: item.picUrl,
		                playCount: item.playCount
		            });
		        }
		    });
		}
	}  
}	
</script>

<style lang="scss">
	// /deep/ .van-tab--active {
	//     color: #dd001b;
	// }
	image {
	    width: 100%;
	    height: 200px;
	}
	swiper {
	    height: 200px;
	}
	.cell-title {
	    font-size: 32rpx;
	    // margin-top: 20rpx;
	    // margin-bottom: 10rpx;
	    padding: 0 15px;
	}
	.cell-SongSheet {
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;
	    padding: 0 8px;
		text{
			color: #ffffff;
		}
	}
	van-icon {
	    position: relative;
	    top: 5px;
	}	
	.content {
		width: 100vw;
		
		background-color: #121429;
	}
	
	.page-body{
		height: 60px;
		width: 100%;
		background-color: #000000;
		position: fixed;
		bottom: 0;
	}
	
	.module-header{
		margin-left: 21px;
		font-size: 18px;
		float: left;
		margin-top: 7px;
	}
	.more{
		float: right;
		margin-right: 18px;
		margin-top: 12px;
	}
	
	.tpl-index {
		background-color: #FFF;
		.menu {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 30upx;
			background-color: #1e2035;
			.one {
				// 			width: 186upx;
				// 			max-width: 186upx;
				display: flex;
				flex-direction: column;
				font-size: $uni-font-size-sm;
				justify-content: center;
				align-items: center;
				margin-top: 24upx;
				margin-bottom: 12upx;
	
				&:nth-child(1) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(2) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(3) {
					.icon-box {
						background-color: #031c3e;
					}
				}
				&:nth-child(4) {
					.icon-box {
						background-color: #031c3e;
					}
				}
	
				.icon-box {
					width: 90upx;
					height: 90upx;
					border-radius: 100upx;
					margin-bottom: 16upx;
					box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
					display: flex;
					align-items: center;
					justify-content: center;
					text {
						font-size: 46upx;
						color: rgb(0, 228, 255);
						// color:#fff;
					}
				}
	
				.text {
					color: #ffffff;
				}
			}
		}
	}
</style>
